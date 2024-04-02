
"use client";

import React from 'react';

const MutationDetection = () => {

  return (
    
    <div className="max-w-lg mx-auto">
      <form >
        <div
          className="border-dashed border-2 bg-gray-800 border-gray-300 p-4 mb-4 text-center cursor-pointer"
        >
          <p>Drag and drop a text file here</p>

          <input
        type="file"
        accept=".txt"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (event) => {
            const fileContent = event.target.result;
            setSequence(fileContent);
          };
          reader.readAsText(file);
        }}
        className="w-full mt-4 p-2 border rounded-md bg-gray-800 text-white"
      />
        </div>

        <button
          type="submit"
          className="block w-full mt-4 px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-600 border p-8 rounded-md" >
          Predict
        </button>
      </form>
      
      
    </div>
  );
}

export default MutationDetection;
