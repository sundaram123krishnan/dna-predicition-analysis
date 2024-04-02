from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

app = Flask(__name__)
CORS(app)

# Assuming you have a dataset with sequences and corresponding labels
# Replace this with your actual dataset
data = {
    'sequence': ['sequence1', 'sequence2', 'sequence3'],
    'mutation': [1, 0, 1]  # 1 for mutation, 0 for non-mutation
}
df = pd.DataFrame(data)

# Extract features and labels
X = df['sequence']
y = df['mutation']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

def getKmers(sequence, size=6):
    return [sequence[x:x+size].lower() for x in range(len(sequence) - size + 1)]

def train_model(X_train, y_train):
    cv = CountVectorizer(ngram_range=(4, 4))
    X_train_transformed = cv.fit_transform(X_train)

    model = LogisticRegression()
    model.fit(X_train_transformed, y_train)

    return model, cv

def detect_mutations(sequence, model, cv):
    sequence_transformed = cv.transform([sequence])
    prediction = model.predict(sequence_transformed)
    
    if prediction[0] == 1:
        return {'mutation_detected': True}
    else:
        return {'mutation_detected': False}

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/detect_mutations', methods=['POST'])
def detect_sequence_mutations():
    data = request.json
    if 'sequence' in data:
        sequence = data['sequence']

        # Train the model on the updated dataset (with the new sequence)
        X_train_updated = np.append(X_train, sequence)
        y_train_updated = np.append(y_train, 1)  # Assuming the sequence is a mutation

        model, cv = train_model(X_train_updated, y_train_updated)

        result = detect_mutations(sequence, model, cv)
        return jsonify(result), 200
    else:
        return jsonify({'error': 'Sequence not provided.'}), 400

if __name__ == '__main__':
    app.run(debug=True)
