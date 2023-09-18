const amqplib = require('amqplib');

const queue = 'rabbit-mq-queue';
let channel, connection;

const connectToQueue = async () => {

    try {
        connection = await amqplib.connect("amqp://localhost:5672");
        channel = await connection.createChannel()
        await channel.assertQueue(queue);

    } catch (err) {
        console.log(err);
    }
}


const getMessageFromQueue = async () => {
    let message = '';

    channel.prefetch(1);
    await channel.consume(queue, (msg) => {
        // console.log("msg: ", msg);
        message = JSON.parse(msg.content.toString());
        channel.ack(msg);

    })
    return message;
}

const closeConnectionToQueue = async () => {
    await channel.close();
    await connection.close();
}

module.exports = {
    connectToQueue,
    getMessageFromQueue,
    closeConnectionToQueue
}