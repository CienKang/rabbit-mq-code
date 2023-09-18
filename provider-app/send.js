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

const sendMessageToQueue = async (msg) => {
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
}

const closeConnectionToQueue = async () => {
    await channel.close();
    await connection.close();
}

module.exports = {
    connectToQueue,
    sendMessageToQueue,
    closeConnectionToQueue
}