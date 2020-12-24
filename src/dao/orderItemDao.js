import OrderItem from "../model/orderItem";

export async function bulkInsertOrderItemDao(orderItems) {
  try {
    let data = await OrderItem.bulkCreate(orderItems, { validate: true });
  } catch (error) {
    throw error;
  }
}
