/**
 * Created on 6/1/17.
 */
var kafka = require('../lib/kafka-node');

function createQueue(name, res) {
    var client = new kafka.Client();
    var producer = new kafka.Producer(client);

    producer.createTopics([name], false, function (err, data) {
        console.log(data);
    });
}

function publishMessage(body, res) {
    var client = new kafka.Client();
    var producer = new kafka.Producer(client);

    var payloads = [ { topic : body.queueName, messages : body.message }];

    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    });

    producer.on('error', function (err) {})
}

function recieveMessage(body, res) {
    var client = new kafka.Client();
    var consumer = new kafka.Consumer(client);

    consumer.addTopics([body.queueName], function (err, added) {
        console.log(queueName + ' subscribed');
    });

    consumer.on('message', function (message) {
        console.log(message);
    });
}
