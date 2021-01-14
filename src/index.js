import express from "express";
import IndexRoutes from "./routes/indexRoute";
import { ServerError, RouteNotFoundError } from "./exception/exceptions";
import bodyParser from "body-parser";
import cors from "cors";
import { responseMsgs } from "./constants/responseMsgsConst";

const app = express();

app.use(cors());
app.use(bodyParser.text({ inflate: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1/customer-orders/orders", IndexRoutes.orderRoutes);
app.use("/v1/user", IndexRoutes.userRoutes);

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
    const error = new ServerError(err);
    return res.status(500).json(error.getServerErrorResponse());
  }
});

app.listen(8082, () => {
  console.log("app listening");
});

export default app;
