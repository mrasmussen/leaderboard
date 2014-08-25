/**
 * Created by mrasmussen on 8/24/14.
 */
var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    //router.get('/', function(req, res) {
    //    res.render('signup.html', { message: req.flash('signupMessage') });
    //});

    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.html', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/course/search', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
