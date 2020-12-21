import { getFromToDateRange } from "../util/dateConversion";
import { getOffset } from "../util/commonUtil";
import {
  orderDataDao,
  orderStatusByIdDao,
  updateOrderStatusDao,
} from "../dao/orderDao";
import logger from "../util/logger";
import { isValidOrderRequest } from "../validation/orderValidation";
import { orderStatusConst, CANCEL_ORDER } from "../constants/orderStatus";

class OrderService {
  async getOrders(fromDate, toDate, page, pageLimit) {
    let dates = getFromToDateRange(fromDate, toDate);
    let offset = getOffset(page);
    let limit = parseInt(pageLimit);

    let [result, colDef] = await orderDataDao(
      dates["fromDate"],
      dates["toDate"],
      limit,
      offset
    );
    return result;
  }

  async cancelOrder(orderId, orderStatusRequest) {
    try {
      let [orderStatusResult, columnDef] = await orderStatusByIdDao(orderId);
      let orderStatus = orderStatusResult[0]["order_status"];
      if (
        isValidOrderRequest(orderStatusRequest) &&
        orderStatus != undefined &&
        orderStatus != orderStatusConst.FAIL &&
        orderStatus != orderStatusConst.CANCEL
      ) {
        let [
          orderUpdateCountResult,
          orderUpdateCountColumnDef,
        ] = await updateOrderStatusDao(orderStatusConst.CANCEL, orderId);
        let orderUpdateCount = orderUpdateCountResult["affectedRows"];
        console.log(orderUpdateCount);
        logger.info(
          "%s error OrderController cancelOrder orderUpdateCount: { %j }",
          orderUpdateCount
        );
        return orderUpdateCount;
      } else {
        return 0;
      }
    } catch (error) {
      logger.error("%s error OrderController cancelOrder %j", error);
      return 0;
    }
  }
}

export default OrderService;
