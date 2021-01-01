import express from "express";
import orderRoute from "./routes/orderRoutes";
import { ServerError, RouteNotFoundError } from "./exception/exceptions";
import bodyParser from "body-parser";
import cors from "cors";
import { responseMsgs } from "./constants/responseMsgsConst";

const app = express();

app.use(cors());
app.use(bodyParser.text({ inflate: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1/customer-orders/order", orderRoute);

app.use((req, res, next) => {
  console.log("invalid route");
  const error = new RouteNotFoundError(responseMsgs.ROUTE_NOT_FOUND);
  next(error);
});

app.use((err, req, res, next) => {
  console.log("exception handler");

  if (err instanceof RouteNotFoundError)
    return res.status(500).json(err.getRouteNotFoundResponse());
  else {
    return res.status(500).json(new ServerError(err));
  }
});

app.listen(8082, () => {
  console.log("app listening");
});

export default app;
