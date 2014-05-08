/**
 * Created by Matt on 5/7/14.
 */
var express = require('express');
var router = express.Router();
var ACS = require('acs-node');

/* GET users listing. */
router.get('/', function(req, res) {
    logout(req, res);
});

function logout(req, res) {

    ACS.Users.logout(function (response) {
        if (response.success) {
            res.redirect('/');
        } else {
            res.send('Error:\n' +
                ((e.error && e.message) || JSON.stringify(e)));
        }
    }, req, res);
}

module.exports = router;