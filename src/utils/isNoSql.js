export const isNoSql = (dbType) => !["postgres", "mysql", "sqlite"].includes(dbType);
