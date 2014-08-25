var express = require('express');
var router = express.Router();
var auth = require('../config/authorization');
var ACS = require('acs-node');

/* GET users listing. */
router.get('/search', auth.isLoggedIn, function(req, res) {
    res.render('course/search.html');
    //res.send('respond with course file <a href="/logout">Logout</a>');
});

router.get('/add', auth.validateSession, function(req, res) {
    res.render('course/index');
    //res.send('respond with course file <a href="/logout">Logout</a>');
});

/* GET users listing. */
router.get('/:coordinates', auth.validateSession, function(req, res) {
    isCourseCreated(req, res);
    //res.json(true);
});
//sel: { "all": ["ClubName"] }
/*
 where: {
 coordinates: {
 '$nearSphere': [-111.6632,40.2711],
 '$maxDistance': 0.00002525
 }
 },*/
function isCourseCreated(req, res) {

    ACS.Objects.query({
        classname: 'golfclub',
        limit: 1,
        response_json_depth: 3,
        where: {
            coordinates: {
                '$nearSphere': [-111.6632,40.2711],
                '$maxDistance': 0.00002525
            }
        },
        sel: JSON.stringify({
            "all":["ClubName","id","[CUSTOM_course]course_id"]
        })
    }, function (e) {
        if (e.success) {
            res.json(e);
        } else {
            console.log('Error:\n' + JSON.stringify(e));
                //((e.error && e.message) || JSON.stringify(e)));
        }
    }, req, res);
}

module.exports = router;