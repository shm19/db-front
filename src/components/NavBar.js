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
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleImport = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
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
    <nav className="bg-blue-600 text-white fixed w-full z-10 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">
          Notebook App
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!notebookId ? (
            <>
              <button
                onClick={onCreateNotebook}
                className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
              >
                + New Notebook
              </button>
              <button
                onClick={onExportAll}
                className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
              >
                Export All
              </button>
              <button
                onClick={handleImport}
                className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
              >
                Import All
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
              >
                Database Settings
              </button>
              <button
                onClick={handleImport}
                className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
              >
                Import Notebook
              </button>
              <button
                onClick={handleExport}
                className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
              >
                Export Notebook
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="md:hidden bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
        >
          Menu
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="bg-blue-700 md:hidden py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            {!notebookId ? (
              <>
                <button
                  onClick={onCreateNotebook}
                  className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
                >
                  + New Notebook
                </button>
                <button
                  onClick={onExportAll}
                  className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
                >
                  Export All
                </button>
                <button
                  onClick={handleImport}
                  className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
                >
                  Import All
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
                >
                  Database Settings
                </button>
                <button
                  onClick={handleImport}
                  className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
                >
                  Import Notebook
                </button>
                <button
                  onClick={handleExport}
                  className="bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-md shadow text-sm font-medium transition"
                >
                  Export Notebook
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Database Settings Modal */}
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
