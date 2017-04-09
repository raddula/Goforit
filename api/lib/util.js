'use strict';

function validateRequest(req, method, cb) {
    if (req || method)
        return cb(undefined);
    return cb(new Error("Invalid Request"));
}


module.exports = {
    validateRequest: validateRequest
};
