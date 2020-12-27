import { Transaction } from "sequelize";
import logger from "../config/logger";
import { sequelize } from "../config/sequalizeDBConnect";
import { OrderStatusConst } from "../constants/orderStatus";
import { insertDeliveryDao } from "../dao/deliveryDao";
import {
  insertOrderDao2,
  orderDataDao,
  orderStatusByIdDao,
  updateOrderStatusDao,
} from "../dao/orderDao";
import { bulkInsertOrderItemDao } from "../dao/orderItemDao";
import {
  findProductPriceByIdDao,
  updateProductQuantityByIdDao,
} from "../dao/productDao";
import { getOffset } from "../util/commonUtil";
import { getFromToDateRange } from "../util/dateConversion";
import {
  getDeliveryAddres,
  getDeliveryDate,
  getInvoiceId,
  getOrderTimeStamp,
} from "../util/orderUtil";
import {
  getValidOrderItemList,
  isValidOrderRequest,
} from "../validation/orderValidation";

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
        orderStatus != OrderStatusConst.CANCEL &&
        orderStatus != OrderStatusConst.FAIL
      ) {
        let orderUpdateCount = await updateOrderStatusDao(
          OrderStatusConst.CANCEL,
          orderId
        );
        logger.info(
          "%s error OrderController cancelOrder orderUpdateCount: { %s }",
          orderUpdateCount
        );
        return orderUpdateCount;
      } else {
        return 0;
      }
    } catch (error) {
      logger.error("%s error OrderController cancelOrder %s", error);
      return 0;
    }
  }

  async placeOrder(orderRequest) {
    try {
      let orderTotalPrice = 0;
      let orderItemsPersist = [];

      const transaction = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });

      let getOrderingProducts = await getValidOrderItemList(
        orderRequest.orderItemList,
        transaction
      );

      for (const item of getOrderingProducts) {
        let productPrice =
          (await findProductPriceByIdDao(item.productId, transaction)) *
          item.quantity;
        orderTotalPrice += productPrice;
        orderItemsPersist.push({
          quantity: item.quantity,
          orderProductTotalPrice: orderTotalPrice,
          productId: item.productId,
          orderId: -1,
        });
      }

      for (const orderitem of getOrderingProducts) {
        await updateProductQuantityByIdDao(
          orderitem.productId,
          orderitem.quantity,
          transaction
        );
      }

      let deliveryId = await insertDeliveryDao(
        getDeliveryDate(),
        orderRequest.userAddresID,
        "pending",
        transaction
      );

      let orderId = await insertOrderDao2(
        orderTotalPrice,
        getOrderTimeStamp(),
        "placed",
        orderRequest.userId,
        deliveryId,
        getInvoiceId(),
        transaction
      );

      for (const orderItem of orderItemsPersist) {
        orderItem.orderId = orderId;
      }

      await bulkInsertOrderItemDao(orderItemsPersist, transaction);

      await transaction.commit();

      return orderId;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export default OrderService;
