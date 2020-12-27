import OrderItem from "../model/orderItem";

export async function bulkInsertOrderItemDao(orderItems, transaction) {
  try {
    let data = await OrderItem.bulkCreate(orderItems, {
      validate: true,
      transaction: transaction,
    });
  } catch (error) {
    throw error;
  }
}
