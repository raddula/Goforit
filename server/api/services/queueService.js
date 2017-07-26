'use strict';

var dao = require('./../dao/dao.js'),
    logger = require('./../lib/logger.js');

var kafka = require('kafka-node');
var console = require('console');
var app = require('express')();
var server = app.listen(8810)
var io = require('socket.io').listen(server);

function createQueue(name, res) {
    var client = new kafka.Client('localhost:2181'); // Externalize Host and Port
    console.log("client : " + client);
    var producer = new kafka.Producer(client);
    console.log("producer : " + producer);
    console.log("topic name : " + name);

    producer.createTopics([name], true, function (err, data) {
        console.log(data);
    });
}

function publishMessage(body) {
    var client = new kafka.Client('localhost:2181'); // Externalize Host and Port
    var producer = new kafka.Producer(client);

    var message = {};//new KeyedMessage;

    message.id = body.id, // auto generated unique id
    message.parent = body.parent, // parent message, available only for Comment and Trust (+1)
    message.type = body.type, // P, C, T (It can come from UI or server can derive based on URI)
    message.sender = body.sender, // H, G (It should come from UI request)
    message.message = body.message, // Not required
    //if (body.sender === 'T') {
        message.trustFactor = body.trustFactor; // incremented value specific to place
    //}

    var payloads = [ { topic : body.queueName, messages : JSON.stringify(message), partition: 0 }];

    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    });

    producer.on('error', function (err) {})
    
    saveMessage(message, function (err, res) {
    	if (err) throw err;
    	else {
    		return res.body;
    	}
    }); 
}

function saveMessage(message) {
	var postInfo = {};
	postInfo.parent_id = 123,
	postInfo.place_id = 765,
	postInfo.type = 'P',
	postInfo.comment_count = 234,
	postInfo.trust_count = 1700,
	postInfo.posted_by = 3456,
	postInfo.posted_as = 'H',
	postInfo.content_type = 'TEXT',
	postInfo.content = 'Sample message';
	dao.savePost(postInfo);
}

function recieveMessage(body, res) {
	var Consumer = kafka.Consumer
	var Offset = kafka.Offset;
	var client = new kafka.Client("localhost:2181/")
	var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
	var offset = new Offset(client);

	consumer = new Consumer(
	        client, 
	        [{ topic: body.queueName, partition: 0, options }]
	);
	
	client.on('ready', function(){
		console.log('Client Ready..!');
	});
	
	consumer.on('error', function (err) {
	    console.log("Kafka Error: Consumer - " + err);
	});
	
	var count = 1;
	consumer.on('message', function (message) {
		var data = JSON.parse(message.value);

		var notification = {};
		notification.id = data.id,
		notification.parent = data.parent,
		notification.type = data.type, // P, C, T
		// Temparory code to test
		notification.timeStamp = new Date();
		notification.count = count++, // Value should be calculated per subscriber, UI can also derive it
		notification.sender = data.sender, // H, G
		notification.trustFactor = data.trustFactor;
		
		io.sockets.emit('news', notification);
	});
	
	/*
	* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
	*/
	consumer.on('offsetOutOfRange', function (topic) {
	  topic.maxNum = 2;
	  offset.fetch([topic], function (err, offsets) {
	    if (err) {
	      return console.error(err);
	    }
	    var min = Math.min(offsets[topic.topic][topic.partition]);
	    consumer.setOffset(topic.topic, topic.partition, min);
	  });
	});
}

function unsubscribeQueue(body, res) {
	var Consumer = kafka.Consumer
	var client = new kafka.Client("localhost:2181/")
	consumer = new Consumer(client);
	
	consumer.removeTopics(['test'], function (err, removed) {
	});
	
	consumer.commit(function(err, data) {
	});
}

module.exports = {
		createQueue: createQueue,
		publishMessage: publishMessage,
		recieveMessage: recieveMessage,
		unsubscribeQueue: unsubscribeQueue
}
