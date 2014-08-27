/**
 * Created by mrasmussen on 8/26/14.
 */

module.exports = function(golfclub) {

    var golfclubController = {};

    golfclubController.findAll = function (req, res, next) {
        var ok = function(doc) {
            res.json(doc);
        };
        var err = function(err) {
            res.status(404).end();
        };
        golfclub.findAll(ok, err);
    };

    golfclubController.findById = function(req, res) {
        var ok = function(doc) {
            res.json(doc);
        };
        var err = function(err) {
            res.status(404).end();
        };
        golfclub.findById(req.params.id, ok, err);
    };

    golfclubController.create = function(req, res) {
        var ok = function(doc) {
            res.location('/golfclub/doc._id');
            res.status(201).end();
            res.json(doc);
        };
        var err = function(err) {
            res.status(409, "Failed to create golfclub").end();
        };
        console.log(req.body);
        golfclub.create(req.body, ok, err);
    };

    golfclubController.update = function(req, res) {
        if (!req.body._id) {
            res.send(404, "id required");
        } else {
            var ok = function(doc) {
                res.send(200);
            };
            var err = function(err) {
                res.send(409, "update failed");
            };
            golfclub.update(req.body, ok, err);
        }
    };

    golfclubController.removeById = function(req, res) {
        var ok = function (doc) {
            res.status(200).end();
        };
        var err = function (err) {
            res.status(409, "Failed to remove golfclub").end();
        };
        golfclub.removeById(req.params.id, ok, err);
    };

    return golfclubController;
};