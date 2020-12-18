import mysqlPool from "../../../config/databaseConfig";

const COUNT_BY_ORDER_ID = `SELECT count(*) FROM orders WHERE order_id =?`;

export const isValidOrder = (data, callBack) => {
  mysqlPool.query(COUNT_BY_ORDER_ID, [data.orderId], (error, result, field) => {
    if (error) callBack(error);
    else console.log(result);
  });
};
