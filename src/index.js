import express from "express";
import orderRoute from "./routes/orderRoutes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.text({ inflate: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1/customer-orders/order", orderRoute);

app.listen(8082, () => {
  console.log("app listening");
});
