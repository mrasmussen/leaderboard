/**
 * Created by mrasmussen on 8/26/14.
 */

module.exports = function(app, router, golfclub) {

    // Get all golf clubs
    router.route('/golfclub')
        .get(golfclub.findAll)
        .post(golfclub.create)

    router.route('/golfclub/:id')
        .get(golfclub.findById)
        .delete(golfclub.removeById)
        .put(golfclub.update)

    return router;
};