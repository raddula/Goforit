'use strict';

var pw = require("credential")(),
    constants = require("./../lib/constants.js"),
    logger = require('./../lib/logger.js').get('dao');


function signIn(database, email, password, next) {
    logger.info('entered getUser', email, password);
    database.collection('users').find({"email": email}, {"_id": 0}).toArray(function (err, result) {
        if (err)
            return next(err);
        if (result.length < 1) {
            return next(new Error('No combination with this username and password found'));
        } else {
            validateUser(result[0], password, next);
        }

    });
}

function signUp(database, email, password, next) {
    logger.info('entered saveUser', email);
    database.collection('users').find({"email": email}, {"_id": 0}).toArray(function (err, result) {
        if (err)
            return next(err);
        logger.info(result);
        if (result.length > 0) {
            return next(new Error('User with this email already exists'));
        } else {
            pw.hash(password, function (err, hash) {
                if (err)
                    return next(err);
                var request = {
                    "email": email,
                    "password": hash
                };
                database.collection('users').insertOne(request, function (err, result) {
                    if (err) return next(err);
                    else
                        return next(undefined, "Inserted");
                });
            });
        }
    });
}

function validateUser(user, password, res) {
    pw.verify(user.password, password, function (err, isValid) {
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
