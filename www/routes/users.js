var express = require('express');
var router = express.Router();
var auth = require('../config/authorization');

/* GET users listing. */
router.get('/', auth.validateSession, function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
