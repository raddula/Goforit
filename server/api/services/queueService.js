/**
 * Created on 6/1/17.
 */
var kafka = require('kafka-node');
var console = require('console');

function createQueue(name, res) {
    var client = new kafka.Client('localhost:2181');
    console.log("client : " + client);
    var producer = new kafka.Producer(client);
    console.log("producer : " + producer);
    console.log("topic name : " + name);

    producer.createTopics([name], true, function (err, data) {
        console.log(data);
    });
}

function publishMessage(body, res) {
    var client = new kafka.Client('localhost:2181');
    var producer = new kafka.Producer(client);

    var payloads = [ { topic : body.queueName, messages : body.message, partition: 0 }];

    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    });

    producer.on('error', function (err) {})
}

function recieveMessage(body, res) {
	console.log("queue name: " + body.queueName);
	var client = new kafka.Client('localhost:2181');
	var consumer = new kafka.Consumer(client, [ {
		topic : body.queueName
	} ]);
	consumer.payloads = [ {
		topic : body.queueName,
		partition : '0',
		offset : 0,
		maxBytes : 1048576,
		metadata : 'm'
	}, ];

	console.log(body.queueName + ' subscribed');

	consumer.on('message', function(message) {
		console.log(message);
	});
}

module.exports = {
		createQueue: createQueue,
		publishMessage: publishMessage,
		recieveMessage: recieveMessage
}
