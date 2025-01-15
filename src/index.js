import React from "react";
import ReactDOM from "react-dom/client"; // React 18 import
import App from "./App";
import { NotebookProvider } from "./contexts/NotebookContext";
import "./index.css"; // Import Tailwind styles

const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap the app with NotebookProvider for global context
root.render(
  <React.StrictMode>
    <NotebookProvider>
      <App />
    </NotebookProvider>
  </React.StrictMode>
);
