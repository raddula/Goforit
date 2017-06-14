'use strict';

var queueService = require('./../services/queueService.js');

function create(database, body, res) {
    // TODO: Get GeoLocation langitude and latitude (temp code)
    // TODO: Add radius to all the corners the GeoLocation (need to explore)
    var longitude = body.longitude;
    var latitude = body.latitude;

    // TODO: Get LoggedIn userID
    var createdBy = body.createdBy;
    var queueName = body.name;

    // TODO: Invoke QueueService to create Topic
    queueService.createQueue(queueName, res);

    // TODO: Store Place in DB using DAO
}

function post(database, body, res) {
    // TODO: Get GeoLocation langitude and latitude (temp code)
    // TODO: Add radius to all the corners the GeoLocation (need to explore)
    // TODO: Invoke QueueService to create Topic
    queueService.publishMessage(body, res);

    // TODO: Store Place in DB using DAO
}

function receive(database, body, res) {
    // TODO: Get GeoLocation langitude and latitude (temp code)
    // TODO: Add radius to all the corners the GeoLocation (need to explore)
    // TODO: Invoke QueueService to create Topic
    queueService.recieveMessage(body, res);

    // TODO: Store Place in DB using DAO
}

module.exports = {
	    create: create,
	    post: post,
	    receive: receive
};


