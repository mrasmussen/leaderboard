/**
 * Created by Matt on 5/7/14.
 */

module.exports = function(app, passport) {

    // =====================================
    // LOGIN ===============================
    // =====================================
    app.route('/login')
        // show the login form
        .get(function(req, res) {
            // render the page and pass in any flash data if it exists
            //res.render('login.ejs', { message: req.flash('loginMessage') });
            var returnUrl = encodeURIComponent(req.query.returnUrl);
            res.render('login.html', { message: req.flash('loginMessage'), returnUrl: returnUrl});
        })
        // process the login form
        .post(passport.authenticate('local-login', {
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }),function(req, res) {
            // If this function gets called, authentication was successful.
            var returnUrl = decodeURIComponent(req.body.returnUrl);
            res.redirect(returnUrl);
        });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
