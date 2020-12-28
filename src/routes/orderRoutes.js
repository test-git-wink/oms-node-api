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
import { OrderStatusConst } from "../constants/orderStatus";

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
        "%s OrderController getOrderRoute %s",
        responseMsgs.INVALID_INPUTS,
        error
      );
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
        await orderService.cancelOrder(orderId, req.body);
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
        "%s error OrderController updateOrderRoute param: { %s }",
        responseMsgs.SERVER_ERROR,
        error
      );
      return res.status(500).json({ message: responseMsgs.SERVER_ERROR });
    }
  }

  async createOrder(req, res, next) {
    try {
      logger.info(
        "OrderController createOrder() param: {  orderRequest : %s}",
        req.body
      );

      if (isValidPostOrderRequest(req.body)) {
        const orderId = await orderService.placeOrder(req.body);
        return res.status(201).json({
          orderId: orderId,
          orderStatus: OrderStatusConst.PLACED,
          message: responseMsgs.SUCCESS,
        });
      } else {
        return res.status(400).json({
          orderStatus: OrderStatusConst.FAIL,
          message: responseMsgs.INVALID_INPUTS,
        });
      }
    } catch (error) {
      logger.error(
        "%s error OrderController updateOrderRoute param: { %s }",
        responseMsgs.SERVER_ERROR,
        error
      );
      return res.status(500).json({ message: responseMsgs.SERVER_ERROR });
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
