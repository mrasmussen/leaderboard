var express = require('express');
var router = express.Router();
var auth = require('../config/authorization');

/* GET users listing. */
router.get('/search', auth.validateSession, function(req, res) {
    res.render('course/search.html');
    //res.send('respond with course file <a href="/logout">Logout</a>');
});

router.get('/add', auth.validateSession, function(req, res) {
    res.render('course/index');
    //res.send('respond with course file <a href="/logout">Logout</a>');
});

module.exports = router;