'use strict';

var signController = require('./../controllers/sign.js'),
placeController = require('./../controllers/place.js'),
fs = require('fs'),
logger = require('./../lib/logger.js').get('routes');

var appRouter = function (app, database) {

	/*app.get('/publisher', function(req, res){
		fs.readFile('/Users/yc05ea1/Work/POC/Goforit/ui/publisher.html',function (err, data){
	        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
	        res.write(data);
	        res.end();
	    });
	});
	
	app.get('/subscriber', function(req, res){
		fs.readFile('/Users/yc05ea1/Work/POC/Goforit/ui/subscriber.html',function (err, data){
	        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
	        res.write(data);
	        res.end();
	    });
	});
	
	app.get('/socket.io.js', function(req, res){
		fs.readFile('/Users/yc05ea1/Work/POC/Goforit/ui/socket.io.js',function (err, data){
	        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
	        res.write(data);
	        res.end();
	    });
	});*/
	
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
    	req.body.queueName = 'test';
    	req.body.postType = 'P';
    	placeController.post(database, req.body, res);
    });

    app.get("/place/subscribe", function (req, res) {
    	req.body.queueName = 'test';
    	placeController.receive(req.body, res);
    });

    app.get("/place/unsubscribe", function (req, res) {
    	req.body.queueName = 'test';
    	placeController.quit(req.body, res);
    });

    app.post("/place/post/:postId/comment", function (req, res) {
    	req.body.queueName = 'test';
    	req.body.postId = postId;
    	req.body.postType = 'C';
    	placeController.post(database, req.body, res);
    });

    app.post("/place/post/:postId/trust", function (req, res) {
    	req.body.queueName = 'test';
    	req.body.postId = postId;
    	req.body.postType = 'T';
    	placeController.post(database, req.body, res);
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
