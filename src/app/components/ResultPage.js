"use client"

const ResultPage = ({ geneFunction }) => {
  return (
    <div>
      <h2>Predicted Gene Function:</h2>
      <p>{geneFunction}</p>
    </div>
  );
};

export default ResultPage;
