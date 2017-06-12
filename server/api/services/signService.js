'use strict';

var dao = require('./../dao/dao.js'),
    logger = require('./../lib/logger.js');

function signIn(database, email, password, next) {
    dao.signIn(database, email, password, next);
}

function signUp(database, email, password, next) {
    dao.signUp(database, email, password, next);
}

module.exports = {
    signIn: signIn,
    signUp: signUp
}