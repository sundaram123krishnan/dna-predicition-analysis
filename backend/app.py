from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

app = Flask(__name__)
CORS(app)

def getKmers(sequence, size=6):
    return [sequence[x:x+size].lower() for x in range(len(sequence) - size + 1)]

def predict_class(sequence):
    # Adjusted function to work with sequences directly
    human_texts = [sequence]
    y_data = np.array([0])  # Placeholder for demonstration, you may not need this

    cv = CountVectorizer(ngram_range=(4,4))
    X = cv.fit_transform(human_texts)

    classifier = MultinomialNB(alpha=0.1)
    classifier.fit(X, y_data)

    # Placeholder return statement, replace this with your actual classification logic
    return {'predicted_class': 'Class A'}

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/classify', methods=['POST'])
def classify_sequence():
    data = request.json
    if 'sequence' in data:
        sequence = data['sequence']
        result = predict_class(sequence)
        return jsonify(result), 200
    else:
        return jsonify({'error': 'Sequence not provided.'}), 400

if __name__ == '__main__':
    app.run(debug=True)
