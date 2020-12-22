import { isBefore, isEqual } from "date-fns";
import moment from "moment";

const INVALID_DATE = "Invalid date";
const DATE_FORMAT = "YYYY-MM-DD";

export const isValidDate = (dateToValidate) => {
  if (moment(dateToValidate, DATE_FORMAT, true).format() === INVALID_DATE)
    return false;
  else return true;
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
