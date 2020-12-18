import { Router } from "express";
import {
  isVallidDateRange,
  isValidNumber,
} from "../validation/commonValidation";

import OrderService from "../service/orderService";
import { getFromToDateRange } from "../util/dateConversion";
import { getOffset } from "../util/commonUtil";
import { orderDataDao } from "../dao/orderDao";

const orderRoutes = Router();

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  async getOrderRoute(req, res, next) {
    try {
      const { fromDate, toDate, page, limit } = req.query;
      if (
        isVallidDateRange(fromDate, toDate) &&
        isValidNumber(page) &&
        isValidNumber(limit)
      ) {
        let dates = getFromToDateRange(fromDate, toDate);
        let offset = getOffset(page);
        let pageLimit = parseInt(limit);

        let [result, colDef] = await orderDataDao(
          dates.fromDate,
          dates.toDate,
          pageLimit,
          offset
        );
        console.log(result);
        return res
          .status(200)
          .json({ message: "Connected!", orderItems: result });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Invalid!" });
    }
  }
}

const orderController = new OrderController();

orderRoutes.get("/", orderController.getOrderRoute);

export default orderRoutes;
