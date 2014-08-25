var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/leaderboard');
var passport = require('passport');
var flash 	 = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var logout = require('./routes/logout');
var course = require('./routes/course');

var ACS = require('acs-node');
ACS.init('UOCa9r785zth4gyMfdmmKGBfgDniXcpA');

var app = express();

// local variables
app.locals.site = {

    title: 'Leaderboard Tour',
    description: 'Golf score keeping and gps yardage on iPhone and Pebble Watch.  Add your course today to be ready for the iWatch.  Currently available for all pebble watches'
};

app.locals.author = {

    name: 'Matt Rasmussen',
    contact: 'matt@leaderboardtour.com'
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.js
app.engine('jade', require('jade').__express);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/logo/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'leaderboardtourrocksmysocks' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

require('./config/passport')(passport, db); // pass passport for configuration

app.use('/', routes);
app.use('/users', users);
require('./routes/login')(app, passport);
app.use('/course', course);
require('./routes/signup')(app, passport);
//app.use('/signup','./routes/signup')(app, passport);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
