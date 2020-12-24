import mysqlPool from "../config/databaseConfig";
import { COUNT_BY_USER_ADDRESS_ID } from "./orderDao";

export async function countByUserAddressIdDao(userAddressId, userId) {
  try {
    let mysqlPoolPromise = mysqlPool.promise();

    let [
      result,
      colDef,
    ] = await mysqlPoolPromise.query(COUNT_BY_USER_ADDRESS_ID, [
      userAddressId,
      userId,
    ]);
    let count = result[0]["count(*)"];

    return count;
  } catch (error) {
    throw error;
  }
}
