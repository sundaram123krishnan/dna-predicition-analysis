// components/InputForm.js
import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ onSubmit }) => {
  const [sequence, setSequence] = useState("");
  const [classificationResult, setClassificationResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      setSequence(fileContent);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/classify", {
        sequence,
      });
      console.log(response);
      setClassificationResult(response.data);
      onSubmit(response.data);
    } catch (error) {
      console.error("Error classifying sequence:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="w-full mt-4 p-2 border rounded-md bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="block w-full mt-4 px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-600 border p-8 rounded-md"
        >
          Predict
        </button>
      </form>

      {classificationResult && (
        <div className="mt-4 text-white">
          <h3>Classification Result:</h3>
          <p>Predicted Class: {classificationResult.predicted_class}</p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
