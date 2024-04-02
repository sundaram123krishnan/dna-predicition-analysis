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

        <button
          type="submit"
          style={{
            display: "block",
            width: "100%",
            marginTop: "1rem",
            padding: "0.5rem",
            backgroundColor: "#4C51BF",
            color: "#E5E7EB",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
          }}
        >
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
