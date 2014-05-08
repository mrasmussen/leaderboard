/**
 * Created by Matt on 5/7/14.
 */

var express = require('express');
var router = express.Router();
var ACS = require('acs-node');

/* GET users listing. */
router.get('/', function(req, res) {
    var returnUrl = encodeURIComponent(req.query.returnUrl);
    res.render('login', {requestUrl: returnUrl});
});

router.post('/', function(req, res) {
    login(req, res);
});

function login(req, res) {
    var data = {
        login: req.body.username,
        password: req.body.password
    };
    ACS.Users.login(data, function(response){
        if(response.success) {
            console.log("Successful to login.");
            console.log("UserInfo: " + JSON.stringify(response.users[0], null, 2))
            var returnUrl = decodeURIComponent(req.body.returnUrl);
            //res.send('Return url = ' + returnUrl + ' <a href="/logout">Logout</a>');
            res.redirect(returnUrl);
        } else {
            console.log("Error to login: " + response.message);
        }
    }, req, res);
}

module.exports = router;
