import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { NotebookContext } from "../contexts/NotebookContext";
import { FaSun, FaMoon } from "react-icons/fa";
import DatabaseSettingsModal from "../modals/DatabaseSettingsModal";

const Navbar = ({ onCreateNotebook, onExportAll }) => {
  const location = useLocation();
  const { importNotebooks, notebooks, saveDatabaseSettings, exportNotebooks } =
    useContext(NotebookContext);
  const notebookId = location.pathname.includes("/notebook/")
    ? location.pathname.split("/")[2]
    : null;

  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Manage dark mode state

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode); // Toggle dark mode class on <html>
  };

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
    <nav className="bg-blue-600 text-white fixed w-full z-10 shadow-md dark:bg-blue-800 dark:text-gray-100">
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

          {/* Dark Mode Toggle */}
          <button
            onClick={handleDarkModeToggle}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-800"
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-300" />
            )}
          </button>
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

            {/* Dark Mode Toggle in Mobile Menu */}
            <button
              onClick={handleDarkModeToggle}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-800 mx-auto"
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-blue-300" />
              )}
            </button>
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
