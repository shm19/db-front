export const isNoSql = (dbType) => {
  dbType = dbType.toLowerCase();

  const sqlDatabases = new Set(["postgres", "mysql", "sqlite", "mssql", "oracle", "db2"]);

  const noSqlDatabases = new Set([
    "mongodb",
    "couchdb",
    "redis",
    "dynamodb",
    "firebase",
    "neo4j",
    "hbase",
  ]);

  if (!noSqlDatabases.has(dbType) && !sqlDatabases.has(dbType)) {
    throw new Error(`Unknown database type: ${dbType}`);
  }

  return noSqlDatabases.has(dbType);
};
