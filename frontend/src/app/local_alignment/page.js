
"use client"


import React from 'react';

const Blast = () => {

  return (
    
    <div className="max-w-lg mx-auto">
      <form >
        <div
          className="border-2 bg-gray-800 border-gray-300 p-4 mb-4 text-center cursor-pointer"
 
        >
          <p>Drag and drop a text file here</p>

          <textarea

          onChange={(e) => setSequence(e.target.value)}
          placeholder="Enter DNA sequence"
          className="w-full h-40 p-2 border resize-none bg-gray-800 text-white"
          style={{ resize: 'vertical' }}
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

export default Blast;
