import { createPool } from "mysql2";

export const mysqlPool = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "sysco_oms",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});
