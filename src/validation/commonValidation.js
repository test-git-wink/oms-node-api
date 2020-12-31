import { isBefore, isEqual } from "date-fns";
import moment from "moment";
import { validateGetOrders } from "../dto/getOrderRequest";

const INVALID_DATE = "Invalid date";
const DATE_FORMAT = "YYYY-MM-DD";

export const isValidDate = (dateToValidate) => {
  return moment(dateToValidate, DATE_FORMAT, true).format() != INVALID_DATE;
};

export const isValidNumber = (str) => {
  return /^\+?(0|[1-9]\d*)$/.test(str);
};

export const isVallidDateRange = (fromDate, toDate) => {
  if (isValidDate(fromDate) && isValidDate(toDate)) {
    let fromParsed = new Date(fromDate);
    let toParsed = new Date(toDate);
    return isBefore(fromParsed, toParsed) || isEqual(toParsed, fromParsed);
  }
  return false;
};

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function isValidGetOrderRequest(request) {
  return (
    validateGetOrders(request) &&
    isVallidDateRange(request.fromDate, request.toDate)
  );
}
