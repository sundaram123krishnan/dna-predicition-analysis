"use client";

import { useState } from "react";
import InputForm from "./components/InputForm";

const Page = () => {
  const [classificationResults, setClassificationResults] = useState(null);

  const handleClassificationResult = (result) => {
    setClassificationResults(result);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2d3748",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "32rem",
          width: "100%",
          border: "2px solid #cbd5e0",
          borderRadius: "0.5rem",
          padding: "2rem",
          backgroundColor: "#4a5568",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          DNA Sequence Classifier
        </h1>
        <InputForm onSubmit={handleClassificationResult} />
      </div>
    </div>
  );
};

export default Page;
