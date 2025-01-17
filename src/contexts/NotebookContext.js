import React, { createContext, useState, useEffect } from "react";

export const NotebookContext = createContext();

export const NotebookProvider = ({ children }) => {
  const [notebooks, setNotebooks] = useState(() => {
    try {
      const storedNotebooks = localStorage.getItem("notebooks");
      return storedNotebooks ? JSON.parse(storedNotebooks) : [];
    } catch (error) {
      console.error("Failed to load notebooks from localStorage:", error);
      return [];
    }
  });

  // Save notebooks to localStorage without query results
  useEffect(() => {
    try {
      const sanitizedNotebooks = notebooks.map((notebook) => ({
        ...notebook,
        blocks: notebook.blocks.map(({ result, ...block }) => block),
      }));
      localStorage.setItem("notebooks", JSON.stringify(sanitizedNotebooks));
    } catch (error) {
      console.error("Failed to save notebooks to localStorage:", error);
    }
  }, [notebooks]);

  const addNotebook = (name) => {
    const newNotebook = {
      id: `notebook-${Date.now()}`,
      name,
      createdAt: new Date().toLocaleString(),
      blocks: [],
      databaseSettings: null,
    };
    setNotebooks((prev) => [...prev, newNotebook]);
  };

  const deleteNotebook = (id) => {
    setNotebooks((prev) => prev.filter((nb) => nb.id !== id));
  };

  const setDatabaseSettings = (id, settings) => {
    setNotebooks((prev) =>
      prev.map((notebook) =>
        notebook.id === id ? { ...notebook, databaseSettings: settings } : notebook
      )
    );
  };

  const exportNotebooks = () => {
    const sanitizedNotebooks = notebooks.map((notebook) => ({
      ...notebook,
      blocks: notebook.blocks.map(({ result, ...block }) => block),
    }));
    const dataStr = JSON.stringify(sanitizedNotebooks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "notebooks.json";
    link.click();
  };

  const importNotebooks = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedNotebooks = JSON.parse(e.target.result);
        setNotebooks((prev) => [...prev, ...importedNotebooks]);
      } catch (error) {
        console.error("Invalid file format:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <NotebookContext.Provider
      value={{
        notebooks,
        setNotebooks,
        addNotebook,
        deleteNotebook,
        setDatabaseSettings,
        exportNotebooks,
        importNotebooks,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
};
