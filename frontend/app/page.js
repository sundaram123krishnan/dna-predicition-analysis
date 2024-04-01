// page.js
"use client";
import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResultPage from "./components/ResultPage";

const Page = () => {
  const [classificationResults, setClassificationResults] = useState(null);

  const handleClassificationResult = (result) => {
    setClassificationResults(result);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="border p-8 rounded-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          DNA Sequence Classifier
        </h1>
        {/* Pass handleClassificationResult function as onSubmit prop */}
        <InputForm onSubmit={handleClassificationResult} />
      </div>
      {/* {classificationResults && <ResultPage {...classificationResults} />} */}
    </div>
  );
};

export default Page;
