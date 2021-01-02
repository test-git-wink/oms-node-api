import { Router } from "express";
import logger from "../config/logger";
import { OrderStatusConst } from "../constants/orderStatus";
import { responseMsgs } from "../constants/responseMsgsConst";
import OrderService from "../service/orderService";
import { isValidGetOrderRequest } from "../validation/commonValidation";
import {
  isValidOrderUpdateRequest,
  isValidPostOrderRequest,
} from "../validation/orderValidation";
import { ServerError } from "../exception/exceptions";

class OrderController {
  async getOrderRoute(req, res, next) {
    try {
      if (isValidGetOrderRequest(req.query)) {
        const result = await orderService.getOrders(req.query);
        return res.status(200).json({ orders: result });
      } else {
        logger.error(
          `%s OrderController getOrderRoute param: { %s}`,
          responseMsgs.INVALID_INPUTS,
          req.query
        );
        return res.status(400).json({ message: responseMsgs.INVALID_INPUTS });
      }
    } catch (error) {
      logger.error(
        "%s OrderController getOrderRoute %s",
        responseMsgs.INVALID_INPUTS,
        error
      );
      next(new ServerError(error));
    }
  }

  async updateOrderRoute(req, res, next) {
    try {
      const orderId = req.params.orderId;

      if (isValidOrderUpdateRequest(orderId)) {
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
      next(new ServerError(error));
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
      next(new ServerError(error));
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
