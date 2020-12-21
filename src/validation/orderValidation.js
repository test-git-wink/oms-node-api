import { countByOrderIdDao } from "../dao/orderDao";
import { OrderRequestStatus } from "../constants/orderStatus";
import { isEmpty } from "../validation/commonValidation";
import logger from "../util/logger";

export async function isValidOrderId(orderId) {
  try {
    let [result, colDef] = await countByOrderIdDao(orderId);
    let count = result["count(*)"];
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
