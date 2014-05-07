/**
 * Created by Matt on 5/7/14.
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;
