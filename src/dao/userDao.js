import mysqlPool from "../config/databaseConfig";
const COUNT_BY_USER_ID = `SELECT count(*) FROM user WHERE user_id = ?`;

export async function countByUserIdDao(userId) {
  try {
    let mysqlPoolPromise = mysqlPool.promise();

    let [result, colDef] = await mysqlPoolPromise.query(COUNT_BY_USER_ID, [
      userId,
    ]);
    let count = result[0]["count(*)"];

    return count;
  } catch (error) {
    throw error;
  }
}
