import logger from "../config/logger";
import { OrderRequestStatus, OrderStatusConst } from "../constants/orderStatus";
import { countByOrderIdDao } from "../dao/orderDao";
import { countByUserAddressIdDao } from "../dao/userAddressDao";
import { findProductByIdDao } from "../dao/productDao";
import { isEmpty, isValidNumber } from "../validation/commonValidation";

export async function isValidOrderId(orderId) {
  let count = await countByOrderIdDao(orderId);
  return count > 0;
}

export function isValidOrderRequest(orderRequest) {
  if (!isEmpty(orderRequest)) {
    for (const key in OrderRequestStatus) {
      if (OrderRequestStatus[key] === orderRequest["orderStatus"]) {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}

export function isValidNewOrderStatus(orderStatus) {
  for (const key in OrderStatusConst) {
    if (OrderStatusConst[key] === orderStatus) {
      return true;
    }
  }
  return false;
}

export async function getValidOrderItemList(itemList, transaction) {
  let orderingProducts = [];

  for (const item of itemList) {
    let product = await findProductByIdDao(item.productId, transaction);
    if (product == null || isEmpty(product)) {
      continue;
    }
    if (product.inStockQuantiy > item.quantity) {
      orderingProducts.push(item);
    }
  }

  return orderingProducts;
}

export async function isValidUserAddress(userAddress, userId) {
  let count = await countByUserAddressIdDao(userAddress, userId);
  return count > 0;
}

export async function isValidPostOrderRequest(orderRequest) {
  const validUserAddress = await isValidUserAddress(
    orderRequest.userAddresID,
    orderRequest.userId
  );

  const validOrderItems = (
    await getValidOrderItemList(orderRequest.orderItemList)
  ).length;

  const validOrderRequestStatus = isValidNewOrderStatus(
    orderRequest.orderStatus
  );

  return validUserAddress && validOrderItems > 0 && validOrderRequestStatus;
}
