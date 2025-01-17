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

  // Save sanitized notebooks to localStorage
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

  const saveDatabaseSettings = (id, settings) => {
    console.log("Saving database settings:", settings);
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

  const importNotebooks = (file, currentNotebookId = null) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        // Handle replacing the current notebook
        if (currentNotebookId) {
          const sanitizedNotebook = {
            ...Object.values(importedData)[0],
            blocks: Object.values(importedData)[0].blocks.map(({ result, ...block }) => block), // Remove result
          };

          console.log("Sanitized notebook:", sanitizedNotebook);
          setNotebooks((prev) =>
            prev.map((notebook) =>
              notebook.id === currentNotebookId
                ? { ...sanitizedNotebook, id: currentNotebookId } // Retain the current notebook ID
                : notebook
            )
          );
        } else {
          // Handle importing multiple notebooks (if importing is not replacing)
          const sanitizedNotebooks = Array.isArray(importedData)
            ? importedData.map((notebook) => ({
                ...notebook,
                blocks: notebook.blocks.map(({ result, ...block }) => block),
              }))
            : [
                {
                  ...importedData,
                  blocks: importedData.blocks.map(({ result, ...block }) => block),
                },
              ];

          setNotebooks((prev) => [...prev, ...sanitizedNotebooks]);
        }
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
        exportNotebooks,
        importNotebooks,
        saveDatabaseSettings,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
};
