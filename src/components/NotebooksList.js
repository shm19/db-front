import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotebookContext } from "../contexts/NotebookContext";

const NotebooksList = () => {
  const { notebooks, deleteNotebook } = useContext(NotebookContext);

  const navigate = useNavigate();

  const handleExportNotebook = (notebook) => {
    const dataStr = JSON.stringify(notebook, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${notebook.name}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteNotebook = (id) => {
    deleteNotebook(id);
  };

  const handleNavigateToNotebook = (id) => {
    navigate(`/notebook/${id}`);
  };

  return (
    <div className="p-24 mx-auto dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-gray-100 dark:bg-gray-900 p-4 rounded shadow">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Your Notebooks</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-white text-sm font-semibold uppercase tracking-wide">
                Name
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-white text-sm font-semibold uppercase tracking-wide">
                Created
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-white text-sm font-semibold uppercase tracking-wide">
                # Notes
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-white text-sm font-semibold uppercase tracking-wide">
                Export
              </th>
              <th className="px-6 py-3 text-left text-gray-800 dark:text-white text-sm font-semibold uppercase tracking-wide">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {notebooks.map((notebook) => (
              <tr
                key={notebook.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-600 transition ease-in-out duration-150"
              >
                <td
                  className="px-6 py-4 text-gray-900 dark:text-white text-sm cursor-pointer font-semibold"
                  onClick={() => handleNavigateToNotebook(notebook.id)}
                >
                  {notebook.name}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                  {notebook.createdAt}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                  {notebook.blocks.length}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleExportNotebook(notebook)}
                    className="bg-gray-500 hover:bg-gray-700 py-2 px-4 text-white text-sm font-medium rounded-md shadow"
                  >
                    Export
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteNotebook(notebook.id)}
                    className="bg-red-500 hover:bg-red-700 py-2 px-4 text-white text-sm font-medium rounded-md shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Notebooks Message */}
      {notebooks.length === 0 && (
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          <p>No notebooks found. Create your first notebook to get started!</p>
        </div>
      )}
    </div>
  );
};

export default NotebooksList;
