import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotebookContext } from "../contexts/NotebookContext";

const NotebooksList = () => {
  const { notebooks, deleteNotebook } = useContext(NotebookContext);

  const navigate = useNavigate();

  const handleViewNotebook = (id) => {
    navigate(`/notebook/${id}`);
  };

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

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Notebooks</h2>
      </div>

      {/* Table */}
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-2 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal bg-slate-100">
            <thead>
              <tr>
                <th className="px-5 font-bold py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Name
                </th>
                <th className="px-5 font-bold py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Created
                </th>
                <th className="px-5 font-bold py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  # Notes
                </th>
                <th className="px-5 font-bold py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Link
                </th>
                <th className="px-5 font-bold py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Export
                </th>
                <th className="px-5 font-bold py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {notebooks.map((notebook) => (
                <tr key={notebook.id}>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-lg">{notebook.name}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{notebook.createdAt}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{notebook.blocks.length}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <button
                      onClick={() => handleViewNotebook(notebook.id)}
                      className="bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-full flex items-center justify-center"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <button
                      onClick={() => handleExportNotebook(notebook)}
                      className="bg-gray-500 hover:bg-gray-700 py-2 px-4 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-full flex items-center justify-center"
                    >
                      Export
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <button
                      onClick={() => handleDeleteNotebook(notebook.id)}
                      className="bg-red-500 hover:bg-red-700 py-2 px-4 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-full flex items-center justify-center"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotebooksList;
