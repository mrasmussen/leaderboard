/**
 * Created by Matt on 5/7/14.
 */

module.exports.validateSession = function(req, res, next) {
    if(!req.cookies.session) {
        return res.redirect('/login?msg=noauth&req=' + req.originalUrl);
    }
    next();
}