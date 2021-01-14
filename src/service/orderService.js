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
  countOrderDataDao,
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
  validOrderCancelRequest,
} from "../validation/orderValidation";
import { findAllProductsDao } from "../dao/productDao";

class OrderService {
  async getOrders(request) {
    const { fromDate, toDate, page, limit } = request;
    const dates = getFromToDateRange(fromDate, toDate);
    const pageLimit = parseInt(limit);
    const pageOffset = getOffset(page, pageLimit);

    const result = await orderDataDao(
      dates["fromDate"],
      dates["toDate"],
      pageLimit,
      pageOffset
    );

    const orderCount = await countOrderDataDao(
      dates["fromDate"],
      dates["toDate"]
    );

    return { result, orderCount };
  }

  async cancelOrder(orderId, orderStatusRequest) {
    let validOrder = await validOrderCancelRequest(orderId, orderStatusRequest);
    if (validOrder) {
      let orderUpdateCount = await updateOrderStatusDao(
        OrderStatusConst.CANCEL,
        orderId
      );
      logger.info(
        "%s OrderController cancelOrder orderUpdateCount: { %s }",
        orderUpdateCount
      );
      return orderUpdateCount;
    } else {
      return 0;
    }
  }

  async placeOrder(orderRequest) {
    try {
      let orderTotalPrice = 0;
      let orderItemsPersist = [];

      const transaction = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
      });

      let getOrderingProducts = await getValidOrderItemList(
        orderRequest.orderItemList,
        transaction
      );

      const promisList = [];
      for (const item of getOrderingProducts) {
        promisList.push(findProductPriceByIdDao(item.productId, transaction));
      }
      const productPrices = await Promise.all(promisList);

      getOrderingProducts.forEach((item, index) => {
        const productPrice = productPrices[index] * item.quantity;
        orderTotalPrice += productPrice;
        orderItemsPersist.push({
          quantity: item.quantity,
          orderProductTotalPrice: orderTotalPrice,
          productId: item.productId,
          orderId: -1,
        });
      });

      await Promise.all(
        getOrderingProducts.map((orderitem, ind) => {
          updateProductQuantityByIdDao(
            orderitem.productId,
            orderitem.quantity,
            transaction
          );
        })
      );

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

  async getProducts() {
    const result = await findAllProductsDao();

    return result;
  }
}

export default OrderService;
