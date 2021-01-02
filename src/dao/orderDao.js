import mysqlPool from "../config/databaseConfig";
import Order from "../model/order";
import { sequelize } from "../config/sequalizeDBConnect";
import { QueryTypes } from "sequelize";

const ORDER_DATA_QUERY = `SELECT o.order_id as id,o.order_total_price as orderTotalPrice,o.order_timestamp as orderTimestamp,o.order_status as orderStatus,o.user_id as customerId,d.delivery_date as deliveryDate,d.delivery_status as deliveryStatus,CONCAT(ua.street_number,' , ',ua.street,' , ',ua.city,' , ',ua.state,' , ',ua.country) as deliveryAddress
 FROM orders o, delivery d ,user_address ua where o.delivery_id=d.delivery_id and d.user_address_id=ua.user_address_id and o.order_timestamp> ? and o.order_timestamp < ? limit ? offset ?`;

const ORDER_DATA_QUERY_COUNT = `SELECT count(*) FROM orders o, delivery d ,user_address ua where o.delivery_id=d.delivery_id and d.user_address_id=ua.user_address_id and o.order_timestamp> ? and o.order_timestamp < ?`;

const UPDATE_ORDER_STATUS = `Update orders  set order_status=? where order_id=?`;

const COUNT_BY_ORDER_ID = `SELECT count(*) FROM orders WHERE order_id = ?`;

const ORDER_STATUS_BY_ID = `SELECT order_status from orders WHERE order_id = ?`;

const PRODUCT_DETAILS_BY_ID = `SELECT product_id,in_stock_quantity,sell_price from product WHERE product_id = ?`;

export const COUNT_BY_USER_ADDRESS_ID = `SELECT count(*) FROM user_address WHERE user_address_id = ? AND user_id = ?`;

const INSERT_ORDER1 = `INSERT INTO orders(order_total_price,order_timestamp,order_status,user_id,delivery_id,invoice_id)VALUES(?,?,?,?,?,?)`;

const INSERT_ORDER2 = `INSERT INTO orders SET ?,?,?,?,?,?`;

const INSERT_DELIVERY2 = `INSERT INTO delivery SET ?,?,?`;

export async function orderDataDao(fromDate, toDate, limit, offset) {
  const results = await sequelize.query(ORDER_DATA_QUERY, {
    replacements: [fromDate, toDate, limit, offset],
    type: QueryTypes.SELECT,
  });

  return results;
}

export async function countOrderDataDao(fromDate, toDate) {
  const results = await sequelize.query(ORDER_DATA_QUERY_COUNT, {
    replacements: [fromDate, toDate],
    type: QueryTypes.SELECT,
  });
  const count = results[0]["count(*)"];
  return count;
}

export async function updateOrderStatusDao(status, orderId) {
  const results = await sequelize.query(UPDATE_ORDER_STATUS, {
    replacements: [status, orderId],
    type: QueryTypes.UPDATE,
  });

  const count = results[1];

  return count;
}

export async function countByOrderIdDao(orderId) {
  let mysqlPoolPromise = mysqlPool.promise();

  let [result, colDef] = await mysqlPoolPromise.query(COUNT_BY_ORDER_ID, [
    orderId,
  ]);

  let count = result["count(*)"];

  return count;
}

export async function orderStatusByIdDao(orderId) {
  let mysqlPoolPromise = mysqlPool.promise();

  let [
    orderStatusResult,
    columnDef,
  ] = await mysqlPoolPromise.query(ORDER_STATUS_BY_ID, [orderId]);

  let orderStatus = orderStatusResult[0]["order_status"];

  return orderStatus;
}

export async function insertOrderDao2(
  ordertTotalPrice,
  orderTimestamp,
  orderStatus,
  userId,
  deliveryId,
  invoiceId,
  transaction
) {
  let order = await Order.create(
    {
      orderTotalPrice: ordertTotalPrice,
      orderTimestamp: orderTimestamp,
      orderStatus: orderStatus,
      userId: userId,
      deliveryId: deliveryId,
      invoiceId: invoiceId,
    },

    { isNewRecord: true, transaction: transaction }
  );
  return order.orderId;
}
