import React from "react";

const QueryInput = () => {
  return (
    <div className="mb-4">
      <textarea
        rows="5"
        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        placeholder="Enter your SQL query here"
      ></textarea>
      <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600">
        Run Query
      </button>
    </div>
  );
};

export default QueryInput;
