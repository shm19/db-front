import React from "react";

const NotebooksTable = ({ notebooks, onDelete, onView, onExport }) => {
  return (
    <table className="table-auto w-full bg-white border border-gray-200 mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2 text-left">Name</th>
          <th className="border px-4 py-2 text-left">Created</th>
          <th className="border px-4 py-2 text-left"># Notes</th>
          <th className="border px-4 py-2">Link</th>
          <th className="border px-4 py-2">Export</th>
          <th className="border px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {notebooks.map((notebook) => (
          <tr key={notebook.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2 text-blue-500">{notebook.name}</td>
            <td className="border px-4 py-2">{notebook.created}</td>
            <td className="border px-4 py-2">{notebook.notesCount}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onView(notebook.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                View
              </button>
            </td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onExport(notebook.id)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Export
              </button>
            </td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onDelete(notebook.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotebooksTable;
