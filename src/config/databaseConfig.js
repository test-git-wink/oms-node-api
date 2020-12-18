import { createPool } from "mysql2";

const mysqlPool = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "sysco_oms",
});

export default mysqlPool;

// export default async function connectionPool() {
//   return mysqlPool.promise();
// }
