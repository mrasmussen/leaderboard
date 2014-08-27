/**
 * Created by mrasmussen on 8/26/14.
 */

var auth = require('../config/authorization');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/course/search', auth.isLoggedIn, function(req, res) {
        res.render('course/search.html');
    });
};