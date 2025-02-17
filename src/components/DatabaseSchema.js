import React, { useEffect, useState } from "react";
import useIsDbSql from "../utils/isSql";

const fetchDatabaseSchema = async (databaseSettings) => {
  try {
    const response = await fetch("http://localhost:8000/api/get-schema", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(databaseSettings),
    });

    if (response.ok) {
      const { schema } = await response.json();
      console.log("Database Schema:", schema);
      return schema;
    } else {
      const { error } = await response.json();
      console.error("Error fetching schema:", error);
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

const DatabaseSchema = ({ databaseSettings, reRender }) => {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isDbSql } = useIsDbSql(databaseSettings.dbType);

  const fetchDatabaseSchema = async (databaseSettings) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/get-schema", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(databaseSettings),
      });

      if (response.ok) {
        const { schema } = await response.json();
        setSchema(schema);
      } else {
        const { error } = await response.json();
        setError(error);
      }
    } catch (err) {
      setError("Failed to fetch schema.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (databaseSettings) {
      fetchDatabaseSchema(databaseSettings);
    }
  }, [databaseSettings, reRender]);

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-300 italic">Loading database schema...</p>;
  }

  if (error) {
    return <p className="text-red-500 dark:text-red-400">{error}</p>;
  }

  if (!schema) {
    return null;
  }

  if (Object.keys(schema).length === 0) {
    return (
      <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded shadow dark:text-gray-100">
        <p className="text-gray-500 dark:text-gray-400 italic">
          No tables or collections found in the database.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded shadow dark:text-gray-100">
      <h2 className="text-lg font-bold mb-4">Database Schema</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(schema).map(([key, value]) => (
          <div
            key={key}
            className="bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-600 rounded-lg p-4"
          >
            <h3 className="text-md font-semibold mb-2">{key}</h3>
            {Array.isArray(value) && isDbSql ? (
              <table className="w-full text-sm text-left text-gray-600 dark:text-gray-200">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-600 border-b">
                    <th className="px-2 py-1 font-medium">Column</th>
                    <th className="px-2 py-1 font-medium">Type</th>
                    <th className="px-2 py-1 font-medium">Constraints</th>
                  </tr>
                </thead>
                <tbody>
                  {value.map((col, index) => (
                    <tr key={index} className="border-b dark:border-gray-500">
                      <td className="px-2 py-1">{col.name}</td>
                      <td className="px-2 py-1">{col.type}</td>
                      <td className="px-2 py-1">
                        {col.notnull ? "NOT NULL" : ""}
                        {col.defaultValue !== null ? ` DEFAULT ${col.defaultValue}` : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              value && (
                <p className="text-gray-500 dark:text-gray-400 italic">{JSON.stringify(value)}</p>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { fetchDatabaseSchema };
export default DatabaseSchema;
