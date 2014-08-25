/**
 * Created by Matt on 5/7/14.
 */

module.exports.validateSession = function(req, res, next) {
    if(!req.cookies._session_id) {
        return res.redirect('/login?msg=noauth&returnUrl=' + req.originalUrl);
    }
    next();
}

// route middleware to make sure a user is logged in
module.exports.isLoggedIn = function(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the login page
    res.redirect('/login?msg=noauth&returnUrl=' + req.originalUrl);
}
