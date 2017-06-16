'use strict';

var express = require("express"),
    models = require('./models'),
    logger = require('./api/lib/logger.js').get('app'),
    bodyParser = require("body-parser"),
    SwaggerUi = require('swagger-tools/middleware/swagger-ui'),
    open = require("opn"),
    SwaggerExpress = require('swagger-express-mw');

var app = express();
module.exports = app;

var config = {
    appRoot: __dirname, // required config
    swaggerFile:`${__dirname}/api/swagger/swagger.yaml` // swagger config file location
};

var db;


SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) {
        console.log(err);
        throw err;
    }
    models.sequelize.sync().then(function() {
        app.use(function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key, Access-Control-Allow-Origin');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(SwaggerUi(swaggerExpress.runner.swagger));

        var routes = require("./api/routes/routes.js")(app, db);
        swaggerExpress.register(app);

        var port = process.env.PORT || 3000;
        app.listen(port, function() {
            logger.info('listening on', port);
        });

        open('http://localhost:3000/docs', function(err) {
            if (err)
                logger.error('The user closed the browser');
        });
    });
});
