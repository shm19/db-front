import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DatabaseSettingsModal from "../modals/DatabaseSettingsModal";
import { NotebookContext } from "../contexts/NotebookContext";

const Navbar = ({ onCreateNotebook, onExportAll }) => {
  const location = useLocation();
  const { importNotebooks, notebooks, saveDatabaseSettings, exportNotebooks } =
    useContext(NotebookContext);
  const notebookId = location.pathname.includes("/notebook/")
    ? location.pathname.split("/")[2]
    : null;

  const [isModalOpen, setModalOpen] = useState(false);

  const handleImport = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log("Importing notebook:", notebookId);
        importNotebooks(file, notebookId);
      }
    };
    fileInput.click();
  };

  const handleExport = () => {
    exportNotebooks();
  };

  const handleTestConnection = async (settings) => {
    return fetch("http://localhost:8000/api/test-connection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
  };

  return (
    <nav className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:underline">
          Notebook App
        </Link>
        <div className="flex items-center gap-4">
          {/* Notebook List Page Buttons */}
          {!notebookId && (
            <>
              <button
                onClick={onCreateNotebook}
                className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg shadow text-white text-sm font-semibold"
              >
                + New Notebook
              </button>
              <button
                onClick={onExportAll}
                className="bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded-lg shadow text-white text-sm font-semibold"
              >
                Export All
              </button>
              <button
                onClick={handleImport}
                className="bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg shadow text-white text-sm font-semibold"
              >
                Import All
              </button>
            </>
          )}
          {/* Notebook Editor Page Buttons */}
          {notebookId && (
            <>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg shadow text-white text-sm font-semibold"
              >
                Database Settings
              </button>
              <button
                onClick={handleImport}
                className="bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg shadow text-white text-sm font-semibold"
              >
                Import Notebook
              </button>
              <button
                onClick={handleExport}
                className="bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded-lg shadow text-white text-sm font-semibold"
              >
                Export Notebook
              </button>
            </>
          )}
        </div>
      </div>
      {notebookId && (
        <DatabaseSettingsModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          initialSettings={
            notebooks.find((notebook) => notebook.id === notebookId)?.databaseSettings
          }
          onTestConnection={handleTestConnection}
          onSave={(settings) => saveDatabaseSettings(notebookId, settings)}
        />
      )}
    </nav>
  );
};

export default Navbar;
