import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import NotebooksList from "./components/NotebooksList";
import NotebookEditor from "./components/NotebookEditor";
import { NotebookContext } from "./contexts/NotebookContext";

const App = () => {
  const { addNotebook, setDatabaseSettings } = useContext(NotebookContext);

  const executeQuery = (query) => {
    if (query.trim().toLowerCase() === "select * from sample_data;") {
      return `<div class="overflow-x-auto">
          <table class="min-w-full border border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="border px-4 py-2 text-left">ID</th>
                <th class="border px-4 py-2 text-left">Name</th>
                <th class="border px-4 py-2 text-left">Age</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">1</td>
                <td class="border px-4 py-2">John Doe</td>
                <td class="border px-4 py-2">25</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">2</td>
                <td class="border px-4 py-2">Jane Smith</td>
                <td class="border px-4 py-2">30</td>
              </tr>
            </tbody>
          </table>
        </div>`;
    }
    return `<p class="text-red-500">No matching data for this query. Try "SELECT * FROM sample_data;"</p>`;
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar
          onCreateNotebook={() => addNotebook("New Notebook")}
          onSetDatabase={setDatabaseSettings}
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
