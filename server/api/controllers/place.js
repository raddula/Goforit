/**
 * Created on 6/1/17.
 */
var queueService = require('./../services/queueService.js');

function createPlace(body, res) {
    // TODO: Get GeoLocation langitude and latitude (temp code)
    // TODO: Add radius to all the corners the GeoLocation (need to explore)
    var langitude = "51.5033640";
    var latitude = "-0.1276250";

    // TODO: Get LoggedIn userID
    var createdBy = "USER001";
    var queueName = body.name;

    // TODO: Invoke QueueService to create Topic
    queueService.createQueue(queueName);

    // TODO: Store Place in DB using DAO
}

