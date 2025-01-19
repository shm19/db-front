import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import NotebooksList from "./components/NotebooksList";
import NotebookEditor from "./components/NotebookEditor";
import { NotebookContext } from "./contexts/NotebookContext";

const App = () => {
  const { addNotebook, exportNotebooks, importNotebooks } = useContext(NotebookContext);

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
            return `<pre class="bg-gray-900 text-white p-4 rounded">${data}</pre>`;
          }
          return `<pre class="bg-gray-900 text-white p-4 rounded">${JSON.stringify(
            data,
            null,
            2
          )}</pre>`;
        }

        if (data && Array.isArray(data)) {
          if (data.length === 0) {
            return `<p class="text-gray-500 italic">No rows to display.</p>`;
          }

          return `<div class="overflow-x-auto">
            <table class="min-w-full border border-gray-300">
              <thead>
                <tr class="bg-gray-100">
                  ${Object.keys(data[0] || {})
                    .map((key) => `<th class="border px-4 py-2 text-left">${key}</th>`)
                    .join("")}
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (row) =>
                      `<tr>${Object.values(row)
                        .map((value) => `<td class="border px-4 py-2">${value}</td>`)
                        .join("")}</tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>`;
        }
        if (data.changes && data.changes > 0) {
          return `<p class="text-green-500">${data.changes} rows affected.</p>`;
        }
        if (message) {
          return `<p class="text-green-500">${message}</p>`;
        }

        return `<p class="text-gray-500 italic">Query executed successfully.</p>`;
      } else {
        const { error } = await response.json();
        return `<p class="text-red-500">${error}</p>`;
      }
    } catch (error) {
      console.error("Error executing query:", error.message);
      return `<p class="text-red-500">Failed to execute query. Please try again.</p>`;
    }
  };

  const handleExportAll = () => {
    exportNotebooks();
  };

  const handleImportAll = (file) => {
    importNotebooks(file);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar
          onCreateNotebook={() => addNotebook("New Notebook")}
          onExportAll={handleExportAll}
          onImportAll={handleImportAll}
        />
        <Routes>
          <Route path="/" element={<NotebooksList />} />
          <Route path="/notebook/:id" element={<NotebookEditor executeQuery={executeQuery} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
