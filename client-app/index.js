const express = require('express');
const { connectToQueue, getMessageFromQueue, closeConnectionToQueue } = require('./receive');
const PORT = process.env.PORT || 4001;

const app = express();

app.use(express.json());

app.get('/get-msg', async (req, res) => {

    await connectToQueue();
    const data = await getMessageFromQueue();

    if (data == '')
        res.json({
            message: "Empty Queue"
        });
    else
        res.json({
            message: "The data has been received successfully.",
            data: data
        });

    await closeConnectionToQueue();
});


app.listen(PORT, () => {
    console.log(`client-app is running on http://localhost:${PORT}`);
});