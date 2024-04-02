from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

app = Flask(__name__)
CORS(app, support_credentials=True)

# Load the dataset from labels.csv
df = pd.read_csv('labels.csv')

# Extract features and labels
X = df['sequence']
y = df['label']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

def getKmers(sequence, size=6):
    return [sequence[x:x+size].lower() for x in range(len(sequence) - size + 1)]

def predict_class(sequence):
    human_texts = [sequence]

    cv = CountVectorizer(ngram_range=(4,4))
    X_train_transformed = cv.fit_transform(X_train)
    X_test_transformed = cv.transform(human_texts)

    classifier = MultinomialNB(alpha=0.1)
    classifier.fit(X_train_transformed, y_train)
    predictions = classifier.predict(X_test_transformed)

    accuracy = accuracy_score(y_test, predictions)
    confusion = confusion_matrix(y_test, predictions)

    return {'predicted_class': int(predictions[0]), 'accuracy': accuracy, 'confusion_matrix': confusion}

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/classify', methods=['POST'])
@cross_origin(supports_credentials=True)
def classify_sequence():
    if 'file' in request.files:
        file = request.files['file']
        sequence = file.read().decode("utf-8")
    else:
        return jsonify({'error': 'File not provided'}), 400

    result = predict_class(sequence)
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(port=5001, debug=True)
