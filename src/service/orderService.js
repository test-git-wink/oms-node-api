import { getFromToDateRange } from "../util/dateConversion";
import { getOffset } from "../util/commonUtil";
import {
  orderDataDao,
  orderStatusByIdDao,
  updateOrderStatusDao,
  insertOrderDao2,
} from "../dao/orderDao";
import logger from "../config/logger";
import {
  isValidOrderRequest,
  getValidOrderItemList,
} from "../validation/orderValidation";
import { orderStatusConst, CANCEL_ORDER } from "../constants/orderStatus";
import {
  findProductPriceByIdDao,
  updateProductQuantityByIdDao,
} from "../dao/productDao";
import { insertDeliveryDao } from "../dao/deliveryDao";
import {
  getDeliveryDate,
  getInvoiceId,
  getOrderTimeStamp,
  getDeliveryAddres,
} from "../util/orderUtil";
import { bulkInsertOrderItemDao } from "../dao/orderItemDao";

class OrderService {
  async getOrders(fromDate, toDate, page, pageLimit) {
    let dates = getFromToDateRange(fromDate, toDate);
    let offset = getOffset(page);
    let limit = parseInt(pageLimit);

    let result = await orderDataDao(
      dates["fromDate"],
      dates["toDate"],
      limit,
      offset
    );

    let orders = [];

    result.forEach((order) => {
      orders.push({
        orderId: order.order_id,
        customerId: order.user_id,
        orderTotalPrice: order.order_total_price,
        orderTimestamp: order.order_timestamp,
        orderStatus: order.order_status,
        deliveryDate: order.delivery_date,
        deliveryStatus: order.delivery_status,
        deliveryAddress: getDeliveryAddres(
          order.street_number,
          order.street,
          order.city,
          order.state,
          order.country
        ),
      });
    });

    return orders;
  }

  async cancelOrder(orderId, orderStatusRequest) {
    try {
      let orderStatus = await orderStatusByIdDao(orderId);
      if (
        isValidOrderRequest(orderStatusRequest) &&
        orderStatus != undefined &&
        orderStatus != orderStatusConst.FAIL &&
        orderStatus != orderStatusConst.CANCEL
      ) {
        let orderUpdateCount = await updateOrderStatusDao(
          orderStatusConst.CANCEL,
          orderId
        );
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

  async placeOrder(orderRequest) {
    let orderTotalPrice = 0;
    let orderItemsPersist = [];

    let getOrderingProducts = await getValidOrderItemList(
      orderRequest.orderItemList
    );

    for (const item of getOrderingProducts) {
      let productPrice =
        (await findProductPriceByIdDao(item.productId)) * item.quantity;
      orderTotalPrice += productPrice;
      orderItemsPersist.push({
        quantity: item.quantity,
        orderProductTotalPrice: orderTotalPrice,
        productId: item.productId,
        orderId: -1,
      });
    }

    let deliveryId = await insertDeliveryDao(
      getDeliveryDate(),
      orderRequest.userAddresID,
      "pending"
    );

    let orderId = await insertOrderDao2(
      orderTotalPrice,
      getOrderTimeStamp(),
      "placed",
      orderRequest.userId,
      deliveryId,
      getInvoiceId()
    );

    for (const orderItem of orderItemsPersist) {
      orderItem.orderId = orderId;
    }

    await bulkInsertOrderItemDao(orderItemsPersist);

    for (const orderitem of getOrderingProducts) {
      await updateProductQuantityByIdDao(
        orderitem.productId,
        orderitem.quantity
      );
    }

    return orderId;
  }
}

export default OrderService;
