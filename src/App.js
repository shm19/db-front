import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import NotebooksList from "./components/NotebooksList";
import NotebookEditor from "./components/NotebookEditor";
import { NotebookContext } from "./contexts/NotebookContext";

const App = () => {
  const { addNotebook, exportNotebooks, importNotebooks } = useContext(NotebookContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
          <Route path="/notebook/:id" element={<NotebookEditor />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
