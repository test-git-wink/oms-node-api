import { th } from "date-fns/locale";
import logger from "../config/logger";
import { responseMsgs } from "../constants/responseMsgsConst";

export class ServerError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = responseMsgs.SERVER_ERROR;
    logger.error(
      "name %s message %s stack %s",
      this.name,
      this.message,
      this.stack
    );
  }

  getServerErrorResponse() {
    return { message: responseMsgs.SERVER_ERROR };
  }
}

export class RouteNotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = responseMsgs.ROUTE_NOT_FOUND;
    logger.error(
      "name %s message %s stack %s",
      this.name,
      this.message,
      this.stack
    );
  }

  getRouteNotFoundResponse() {
    return { message: responseMsgs.ROUTE_NOT_FOUND };
  }
}
