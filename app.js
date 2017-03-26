'use strict';

var express = require("express"),
    logger = require('./api/lib/logger.js').get('app'),
    bodyParser = require("body-parser"),
    SwaggerUi = require('swagger-tools/middleware/swagger-ui'),
    open = require("opn"),
    SwaggerExpress = require('swagger-express-mw');

var app = express();
module.exports = app;

const MongoClient = require('mongodb').MongoClient;

var config = {
    appRoot: __dirname // required config
};

var db;

SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }
    MongoClient.connect('mongodb://localhost:27017/dataGenerator', function (err, database) {
        if (err) {
            logger.error("Not Connected TO DATABASE");
            throw new Error("Can't Connect to Mongo Server");
        }
        db = database;

        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key, Access-Control-Allow-Origin');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(SwaggerUi(swaggerExpress.runner.swagger));

        var routes = require("./api/routes/routes.js")(app, db);
        swaggerExpress.register(app);

        var port = process.env.PORT || 3000;
        app.listen(port, function () {
            logger.info('listening on', port);
        });

        open('http://localhost:3000/docs', function (err) {
            if (err)
                logger.error('The user closed the browser');
        });

    });
});
