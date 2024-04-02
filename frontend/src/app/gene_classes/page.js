"use client"

import React, { useState } from 'react';

const Blast = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5001/classify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to classify sequence');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="border-2 bg-gray-800 border-gray-300 p-4 mb-4 text-center cursor-pointer">
          <p>Upload a text file:</p>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="w-full p-2 border bg-gray-800 text-white"
          />
        </div>

        <button
          type="submit"
          className="block w-full mt-4 px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-600 border p-8 rounded-md"
        >
          Predict
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <h2>Prediction:</h2>
          <p>Predicted class: {result.predicted_class}</p>
          <p>Accuracy: {result.accuracy}</p>
          <p>Confusion Matrix:</p>
          <pre>{JSON.stringify(result.confusion_matrix, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Blast;
