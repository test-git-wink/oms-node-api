import mysqlPool from "../config/databaseConfig";
import { COUNT_BY_USER_ADDRESS_ID } from "./orderDao";

const FIND_USER_ADDRESSES_BY_ID =
  "SELECT user_address_id as userAddressId,concat(street_number,' , ',street,' , ',city,' , ',state,' , ',country) as userAddress FROM sysco_oms.user_address where user_id = ?";

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

export async function findUserAddressByUserIdDao(userId) {
  try {
    let mysqlPoolPromise = mysqlPool.promise();

    let [
      result,
      colDef,
    ] = await mysqlPoolPromise.query(FIND_USER_ADDRESSES_BY_ID, [userId]);

    return result;
  } catch (error) {
    throw error;
  }
}
