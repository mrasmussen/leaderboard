var express = require('express');
var router = express.Router();
var auth = require('../config/authorization');

/* GET users listing. */
router.get('/add', auth.validateSession, function(req, res) {
    res.send('respond with course file <a href="/logout">Logout</a>');
});

module.exports = router;