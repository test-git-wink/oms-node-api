import OrderItem from "../model/orderItem";

export async function bulkInsertOrderItemDao(orderItems) {
  OrderItem.beforeBulkCreate(orderItems);
}
