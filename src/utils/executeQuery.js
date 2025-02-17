import { isSql } from "./isSql";

export const executeQuery = async (query, databaseSettings) => {
  const isNonSQLBool = await isSql(databaseSettings.dbType);

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

      if (isNonSQLBool) {
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
          return { type: "table", content: [] };
        }

        return { type: "table", content: data };
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
