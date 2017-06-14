'use strict';

var signController = require('./../controllers/sign.js'),
placeController = require('./../controllers/place.js'),
logger = require('./../lib/logger.js').get('routes');

var appRouter = function (app, database) {

    //sign
    app.post("/signIn", function (req, res) {
        signController.signIn(database, req.body, res);
    });

    app.post("/signup", function (req, res) {
        signController.signUp(database, req.body, res);
    });

    app.post("/place/create", function (req, res) {
    	placeController.create(database, req.body, res);
    });

    app.post("/place/post", function (req, res) {
    	placeController.post(database, req.body, res);
    });

    app.post("/place/receive", function (req, res) {
    	placeController.receive(database, req.body, res);
    });

};
module.exports = appRouter;
