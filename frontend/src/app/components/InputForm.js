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
      const response = await axios.post(
        "http://localhost:5000/detect_mutations",
        {
          sequence,
        }
      );
      console.log(response.data.mutation_detected);
      setClassificationResult(response.data);
      // console.log(classificationResult.mutation_detected)
      onSubmit(response.data);
    } catch (error) {
      console.error("Error classifying sequence:", error);
    }
  };

  return (
    <div style={{ maxWidth: "32rem", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          style={{
            width: "100%",
            marginTop: "1rem",
            padding: "0.5rem",
            border: "1px solid #CBD5E0",
            borderRadius: "0.25rem",
            backgroundColor: "#1F2937",
            color: "#E5E7EB",
          }}
        />

        <textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Enter DNA sequence"
          className="w-full h-40 p-2 border resize-none bg-gray-800 text-white"
          style={{ resize: 'vertical' }}
        />
        <button
          type="submit"
          className="block w-full mt-4 px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-600 border p-8 rounded-md" >
          Predict
        </button>

      </form>

      {classificationResult && (
        <div style={{ marginTop: "1rem", color: "#E5E7EB" }}>
          <h3>
            Mutation Detected: {String(classificationResult.mutation_detected)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default InputForm;
