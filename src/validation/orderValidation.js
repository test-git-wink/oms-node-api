import logger from "../config/logger";
import { OrderRequestStatus, OrderStatusConst } from "../constants/orderStatus";
import { countByOrderIdDao, countByUserAddressIdDao } from "../dao/orderDao";
import { findProductByIdDao } from "../dao/productDao";
import { isEmpty } from "../validation/commonValidation";

export async function isValidOrderId(orderId) {
  try {
    let count = await countByOrderIdDao(orderId);
    return count > 0;
  } catch (error) {
    logger.error("isValidOrder() %j", error);
    return false;
  }
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

export async function getValidOrderItemList(itemList) {
  let orderingProducts = [];

  try {
    for (const item of itemList) {
      let product = await findProductByIdDao(item.productId);
      if (product == null) {
        continue;
      }
      if (!isEmpty(product) && product.inStockQuantiy > item.quantity) {
        orderingProducts.push(item);
      }
    }

    return orderingProducts;
  } catch (error) {
    logger.error("getValidOrderItemList() %s", error);
    return orderingProducts;
  }
}

export async function isValidUserAddress(userAddress, userId) {
  try {
    let count = await countByUserAddressIdDao(userAddress, userId);
    return count > 0;
  } catch (error) {
    logger.error("invalid user address %j", error);
    return false;
  }
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
