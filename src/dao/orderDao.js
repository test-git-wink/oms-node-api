import { toDate } from "date-fns";
import mysqlPool from "../../../config/databaseConfig";

const ORDER_DATA_QUERY = `SELECT o.order_id,o.order_total_price,o.order_timestamp,o.order_status,o.user_id,d.delivery_date,d.delivery_status,ua.street_number,ua.street,ua.city,ua.state,ua.country
 FROM orders o, delivery d ,user_address ua where o.delivery_id=d.delivery_id and d.user_address_id=ua.user_address_id and o.order_timestamp> ? and o.order_timestamp<?`;

export async function orderDataDao(fromDate, toDate, page, pageLimit) {
  mysqlPool.query(ORDER_DATA_QUERY, []);
}