import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import NotebooksList from "./components/NotebooksList";
import NotebookEditor from "./components/NotebookEditor";
import { NotebookContext } from "./contexts/NotebookContext";

const App = () => {
  const { addNotebook, exportNotebooks, importNotebooks } = useContext(NotebookContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const executeQuery = async (query, databaseSettings) => {
    const isNonSQL = !["postgres", "mysql", "sqlite"].includes(databaseSettings.dbType);

    try {
      const response = await fetch("http://localhost:8000/api/execute-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...databaseSettings,
          query,
        }),
      });

      if (response.ok) {
        const { data, message } = await response.json();

        if (isNonSQL) {
          if (typeof data === "string") {
            return { type: "string", content: data };
          }

          if (Array.isArray(data)) {
            return { type: "array", content: data };
          }

          if (typeof data === "object" && data !== null) {
            return { type: "object", content: data };
          }

          return { type: "unknown", content: data };
        }

        if (data && Array.isArray(data)) {
          if (data.length === 0) {
            return { type: "table", content: [] }; // Empty table
          }

          return { type: "table", content: data }; // Table data
        }

        if (data && data.changes) {
          return { type: "message", content: `${data.changes} rows affected.` };
        }

        if (message) {
          return { type: "message", content: message };
        }

        return { type: "message", content: "Query executed successfully." };
      } else {
        const { error } = await response.json();
        return { type: "error", content: error };
      }
    } catch (error) {
      console.error("Error executing query:", error.message);
      return { type: "error", content: "Failed to execute query. Please try again." };
    }
  };

  const handleExportAll = () => {
    exportNotebooks();
  };

  const handleImportAll = (file) => {
    importNotebooks(file);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <Router>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Navbar
          onCreateNotebook={() => addNotebook("New Notebook")}
          onExportAll={handleExportAll}
          onImportAll={handleImportAll}
          handleDarkModeToggle={handleDarkModeToggle}
        />
        <div className="pt-16"></div>
        <Routes>
          <Route path="/" element={<NotebooksList />} />
          <Route path="/notebook/:id" element={<NotebookEditor executeQuery={executeQuery} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
