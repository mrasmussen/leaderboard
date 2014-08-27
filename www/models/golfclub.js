/**
 * Created by mrasmussen on 8/26/14.
 */

module.exports = function(db) {

    var golfclubModel = {};
    var collection = db.get('golfclub');

    // Retrieve a list of all
    golfclubModel.findAll = function(success, error) {
        collection.find({},{},response(success, error));
    };

    // Retrieve a golfclub by its id
    golfclubModel.findById = function(id, success, error) {
        collection.findById(id, response(success,error));
    };

    // Persist a new golfclub document
    golfclubModel.create = function(golfclub, success, error) {
        collection.insert(golfclub, response(success,error));
    };

    // Update an existing golfclub document by id
    golfclubModel.update = function(golfclub, success, error) {
        collection.findAndModify(golfclub._id,
            { $set: { name: golfclub.name } }, response(success, error));
    };

    // Remove a golfclub by id
    golfclubModel.removeById = function(id, success, error) {
        collection.remove({_id : id}, response(success, error));
    };

    // Callback to the supplied success and error functions
    // The caller will supply this function.
    var response = function(success, error) {
        return function(err, doc) {
            if (err) {
                // an error occurred, call the supplied error function
                error(err);
            } else {
                // call the supplied success function
                success(doc);
            }
        };
    };

    return golfclubModel;
};