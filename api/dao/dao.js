'use strict';

var pw = require("credential")(),
    models = require('../../models'),
    constants = require("./../lib/constants.js"),
    logger = require('./../lib/logger.js').get('dao');


function signIn(database, email, password, next) {
    logger.info('entered getUser', email, password);
    models.user.findOne({
        where: {
            email_id: email,
            password: password
        }
    }).then(function(err) {
        console.log(err);
        next(user);
    }).then(function(user) {
        console.log(user);
        next(user);
    });
}

function signUp(database, email, password, next) {
    logger.info('entered saveUser', email);
    models.user.findOrCreate({
            where: {
                email_id: email,
                password: password
            }
        })
        .spread(function(user, created) {
            console.log(user + ' ' + created);
            if (!created) {
                return next(new Error('User with this email already exists'));
            }
            next(user);
        });
};

function validateUser(user, password, res) {
    pw.verify(user.password, password, function(err, isValid) {
        if (err) {
            return res(err);
        }
        if (isValid) {
            return res(undefined, "Matched");
        } else {
            return res(new Error('Invalid Password'));
        }

    });
}



module.exports = {
    signIn: signIn,
    signUp: signUp
};
