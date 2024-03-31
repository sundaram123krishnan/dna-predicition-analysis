// result.js

import Link from 'next/link';
import React from 'react';

const ResultPage = ({ accuracy, precision, recall, f1, confusionMatrix }) => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Classification Results</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Accuracy</h2>
          <p>{accuracy.toFixed(3)}</p>
        </div>
        {/* Display other metrics */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Confusion Matrix</h2>
          <div className="overflow-auto">
            {/* Display confusion matrix */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
