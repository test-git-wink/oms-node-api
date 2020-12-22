import { Router } from "express";
import OrderService from "../service/orderService";
import logger from "../config/logger";
import {
  isValidNumber,
  isVallidDateRange,
} from "../validation/commonValidation";
import {
  isValidOrderId,
  isValidPostOrderRequest,
} from "../validation/orderValidation";
import { responseMsgs } from "../constants/responseMsgsConst";

class OrderController {
  async getOrderRoute(req, res, next) {
    try {
      const { fromDate, toDate, page, limit } = req.query;
      logger.info(
        "OrderController getOrderRoute param: { fromDate=%s,toDate=%s,page=%s,limit=%s}",
        fromDate,
        toDate,
        page,
        limit
      );
      if (
        isVallidDateRange(fromDate, toDate) &&
        isValidNumber(page) &&
        isValidNumber(limit)
      ) {
        let result = await orderService.getOrders(
          fromDate,
          toDate,
          page,
          limit
        );
        return res.status(200).json({ orders: result });
      } else {
        logger.error(
          `%s OrderController getOrderRoute param: { fromDate=%s,toDate=%s,page=%s,limit=%s}`,
          responseMsgs.INVALID_INPUTS,
          fromDate,
          toDate,
          page,
          limit
        );
        return res.status(400).json({ message: responseMsgs.INVALID_INPUTS });
      }
    } catch (error) {
      logger.error(
        "%s OrderController getOrderRoute %j",
        responseMsgs.INVALID_INPUTS,
        error
      );
      console.log(error);
      return res.status(500).json({ message: responseMsgs.SERVER_ERROR });
    }
  }

  async updateOrderRoute(req, res, next) {
    try {
      const orderId = req.params.orderId;

      logger.info(
        "OrderController updateOrderRoute() param: { orderId: %s , orderStatus : %j}",
        orderId,
        req.body
      );

      if (
        orderId != undefined &&
        isValidNumber(orderId) &&
        isValidOrderId(orderId)
      ) {
        orderService.cancelOrder(orderId, req.body);
        return res.status(204).json({ message: responseMsgs.SUCCESS });
      } else {
        logger.error(
          "%s OrderController updateOrderRoute() param: { orderId: %s , orderStatus : %j}",
          responseMsgs.INVALID_INPUTS,
          orderId,
          req.body
        );
        return res.status(400).json({ message: responseMsgs.INVALID_INPUTS });
      }
    } catch (error) {
      logger.error(
        "%s error OrderController updateOrderRoute param: { %j }",
        responseMsgs.SERVER_ERROR,
        error
      );
      return res.status(500).json({ message: responseMsgs.SERVER_ERROR });
    }
  }

  async createOrder(req, res, next) {
    logger.info(
      "OrderController createOrder() param: {  orderRequest : %j}",
      req.body
    );

    if (isValidPostOrderRequest(req.body)) {
      orderService.placeOrder(req.body);
    } else {
    }
  }
}

const orderRoutes = Router();

const orderService = new OrderService();

const orderController = new OrderController();

orderRoutes.get("/", orderController.getOrderRoute);
orderRoutes.patch("/:orderId", orderController.updateOrderRoute);
orderRoutes.post("/", orderController.createOrder);

export default orderRoutes;
