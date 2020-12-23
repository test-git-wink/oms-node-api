import OrderItem from "../model/orderItem";

export async function bulkInsertOrderItemDao(orderItems) {
  let data = await OrderItem.beforeBulkCreate(orderItems, { validate: true });
}
