'use strict';

var signController = require('./../controllers/sign.js'),
    logger = require('./../lib/logger.js').get('routes');

var appRouter = function (app, database) {

    //sign
    app.post("/signIn", function (req, res) {
        signController.signIn(database, req.body, res);
    });

    app.post("/signup", function (req, res) {
        signController.signUp(database, req.body, res);
    });


    app.get('user/:userId', function( req, res) {
        userController.home(req.params.userId, res)
    });

    app.get('user/:userId/longitude/:longitude/latitude/:latitude', function( req, res) {
        userController.home(req.params, res);
    })

    app.get('places/:placeId', function( req, res) {
        placeController.placeInfo(req.params, res);
    })

};
module.exports = appRouter;
