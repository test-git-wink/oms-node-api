import OrderController from "./orderController";
import UserController from "./userController";
import { Router } from "express";

const orderRoutes = Router();
const userRoutes = Router();

const orderController = new OrderController();
const userController = new UserController();

orderRoutes.get("", orderController.getOrderRoute);
orderRoutes.patch("/:orderId", orderController.updateOrderRoute);
orderRoutes.post("", orderController.createOrder);
orderRoutes.get("/products", orderController.getProducts);

userRoutes.get("/:userId/user-addresses", userController.getUserAddress);

const IndexRoutes = {
  orderRoutes: orderRoutes,
  userRoutes: userRoutes,
};

export default IndexRoutes;
