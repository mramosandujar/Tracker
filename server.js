const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/pillTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Define the Pill schema and model
const pillSchema = new mongoose.Schema({
    date: String,
    pillName: String
});

const Pill = mongoose.model('Pill', pillSchema);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle saving pill information
app.post('/save-pill', async (req, res) => {
    const { date, pillName } = req.body;
    console.log('Received request to save pill:', { date, pillName }); // Debug Log
    if (date && pillName) {
        try {
            const pill = new Pill({ date, pillName });
            await pill.save();
            console.log(`Saving: ${pillName} for ${date}`);
            res.send('Pill information saved successfully!');
        } catch (error) {
            console.error('Error saving pill information', error);
            res.status(500).send('Error saving pill information.');
        }
    } else {
        console.error('Invalid request data:', req.body); // Debug Log
        res.status(400).send('Invalid request data.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
