const express = require('express');
const { connectToQueue, sendMessageToQueue, closeConnectionToQueue } = require('./send');
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.get('/send-msg', async (req, res) => {
    const queryParams = req.query;

    await connectToQueue();
    await sendMessageToQueue(queryParams);

    res.json({
        message: "The data has been sent successfully."
    });

    await closeConnectionToQueue();
});


app.listen(PORT, () => {
    console.log(`provider-app is running on http://localhost:${PORT}`);
});