import React from "react";

const ResultsTable = ({ results = [] }) => {
  if (results.length === 0) {
    return <p className="text-gray-600 italic">No results to display yet.</p>;
  }

  const headers = Object.keys(results[0]);

  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((header) => (
            <th key={header} className="border border-gray-300 p-2 text-left font-medium">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {results.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {headers.map((header) => (
              <td key={header} className="border border-gray-300 p-2 text-sm">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
