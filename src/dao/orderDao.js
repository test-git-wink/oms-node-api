import mysqlPool from "../config/databaseConfig";
import Order from "../model/order";

const ORDER_DATA_QUERY = `SELECT o.order_id as id,o.order_total_price as orderTotalPrice,o.order_timestamp as orderTimestamp,o.order_status as orderStatus,o.user_id as customerId,d.delivery_date as deliveryDate,d.delivery_status as deliveryStatus,CONCAT(ua.street_number,' , ',ua.street,' , ',ua.city,' , ',ua.state,' , ',ua.country) as deliveryAddress
 FROM orders o, delivery d ,user_address ua where o.delivery_id=d.delivery_id and d.user_address_id=ua.user_address_id and o.order_timestamp> ? and o.order_timestamp < ? limit ? offset ?`;

const UPDATE_ORDER_STATUS = `Update orders  set ? where ?`;

const COUNT_BY_ORDER_ID = `SELECT count(*) FROM orders WHERE order_id = ?`;

const ORDER_STATUS_BY_ID = `SELECT order_status from orders WHERE order_id = ?`;

const PRODUCT_DETAILS_BY_ID = `SELECT product_id,in_stock_quantity,sell_price from product WHERE product_id = ?`;

export const COUNT_BY_USER_ADDRESS_ID = `SELECT count(*) FROM user_address WHERE user_address_id = ? AND user_id = ?`;

const INSERT_ORDER1 = `INSERT INTO orders(order_total_price,order_timestamp,order_status,user_id,delivery_id,invoice_id)VALUES(?,?,?,?,?,?)`;

const INSERT_ORDER2 = `INSERT INTO orders SET ?,?,?,?,?,?`;

const INSERT_DELIVERY2 = `INSERT INTO delivery SET ?,?,?`;

export async function orderDataDao(fromDate, toDate, limit, offset) {
  let mysqlPoolPromise = mysqlPool.promise();

  const [rows, fields] = await mysqlPoolPromise.query(ORDER_DATA_QUERY, [
    fromDate,
    toDate,
    limit,
    offset,
  ]);

  return rows;
}

export async function updateOrderStatusDao(status, orderId) {
  let mysqlPoolPromise = mysqlPool.promise();

  let [
    orderUpdateCountResult,
    orderUpdateCountColumnDef,
  ] = await mysqlPoolPromise.query(UPDATE_ORDER_STATUS, [
    { order_status: status },
    { order_id: orderId },
  ]);

  let orderUpdateCount = orderUpdateCountResult["affectedRows"];

  return orderUpdateCount;
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
