'use strict';

var log4js = require('log4js');

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/log.log'));

function get(name, level) {
    var logger = log4js.getLogger(name);
    logger.setLevel(level);
    return logger;
}


module.exports = {
    get: get
};
