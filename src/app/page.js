// page.js
"use client"

import React, { useState } from 'react';
import axios from 'axios';
import InputForm from '@/app/components/InputForm';
import ResultPage from '@/app/components/ResultPage';

const Page = () => {
  const [classificationResults, setClassificationResults] = useState(null);

  const handleClassification = async (sequence) => {
    try {
      const response = await axios.post('/api/classify', { sequence });
      setClassificationResults(response.data);
    } catch (error) {
      console.error('Error classifying data:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="border p-8 rounded-md">
        <h1 className="text-3xl font-bold text-center mb-8">DNA Sequence Classifier</h1>
        {/* Pass handleClassification function as onSubmit prop */}
        <InputForm onSubmit={handleClassification} />
      </div>
      {classificationResults && <ResultPage {...classificationResults} />}
    </div>
  );
};

export default Page;
