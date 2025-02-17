import { useState, useEffect } from "react";

export const isSql = async (dbType) => {
  dbType = dbType.toLowerCase();
  try {
    const response = await fetch("http://localhost:8000/api/is-sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dbType }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Response:", response, data.isSql);
    return data.isSql;
  } catch (error) {
    console.error("Error checking database type:", error);
    throw error;
  }
};

const useIsDbSql = (dbType) => {
  const [isDbSql, setIsDbSql] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkDbType = async () => {
      try {
        const result = await isSql(dbType);
        setIsDbSql(result);
      } catch (err) {
        console.error("Error checking database type:", err);
        setError("Error checking database type.");
      }
    };

    if (dbType) {
      checkDbType();
    }
  }, [dbType]);

  return { isDbSql, error };
};

export default useIsDbSql;
