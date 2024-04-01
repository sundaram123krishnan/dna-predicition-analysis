const express = require('express');
const bodyParser = require('body-parser');
const { CountVectorizer, MultinomialNB } = require('sklearn.feature_extraction.text');
const { accuracy_score, f1_score, precision_score, recall_score } = require('sklearn.metrics');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Function to preprocess data
function preprocessData(data) {
    const sequences = data.map(item => item.sequence);
    const labels = data.map(item => item.class);
    const texts = sequences.map(sequence => getKmers(sequence));
    return { texts, labels };
}

// Function to extract k-mers from a sequence
function getKmers(sequence, size = 6) {
    const kmers = [];
    for (let i = 0; i < sequence.length - size + 1; i++) {
        kmers.push(sequence.slice(i, i + size).toLowerCase());
    }

    // Return response
    res.status(200).json({ message: 'File uploaded and classified successfully' });
};

// Define API endpoint for prediction
app.post('/api/predict', (req, res) => {
    // Retrieve DNA sequence from req.body.sequence
    const sequence = req.body.sequence;

    // Perform classification (Replace this with your actual classification logic)
    const predictedFunction = classifyDNASequence(sequence);

    // Send the predicted gene function as response
    res.json({ prediction: predictedFunction });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
