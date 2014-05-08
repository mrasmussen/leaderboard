/**
 * Created by Matt on 5/7/14.
 */

module.exports.validateSession = function(req, res, next) {
    if(!req.cookies._session_id) {
        return res.redirect('/login?msg=noauth&returnUrl=' + req.originalUrl);
    }
    next();
}