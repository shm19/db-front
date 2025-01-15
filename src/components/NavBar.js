import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DatabaseSettingsModal from "../modals/DatabaseSettingsModal";
import { NotebookContext } from "../contexts/NotebookContext";

const Navbar = ({ onCreateNotebook, onSetDatabase, onExportAll, onImportAll }) => {
  const location = useLocation();
  const id = location.pathname.includes("/notebook/") ? location.pathname.split("/")[2] : null;

  const { notebooks } = useContext(NotebookContext);
  console.log(notebooks);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSaveSettings = (settings) => {
    onSetDatabase(id, settings);
    setModalOpen(false);
  };

  const handleImport = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onImportAll(file);
      }
    };
    fileInput.click();
  };

  return (
    <nav className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:underline">
          Notebook App
        </Link>
        <div className="flex items-center gap-4">
          {/* Notebook List Page Buttons */}
          {!id && (
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
          {id && (
            <>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg shadow text-white text-sm font-semibold"
              >
                Database Settings
              </button>
              <button
                onClick={onExportAll}
                className="bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded-lg shadow text-white text-sm font-semibold"
              >
                Export
              </button>
              <button
                onClick={handleImport}
                className="bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg shadow text-white text-sm font-semibold"
              >
                Import
              </button>
            </>
          )}
        </div>
      </div>
      {/* Database Settings Modal */}
      {id && (
        <DatabaseSettingsModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveSettings}
          initialSettings={notebooks.find((notebook) => notebook.id === id)?.databaseSettings}
        />
      )}
    </nav>
  );
};

export default Navbar;
