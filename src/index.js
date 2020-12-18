import express from "express";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use("/v1/customer-orders/order", orderRoutes);

app.listen(8082, () => {
  console.log("app listening");
});
