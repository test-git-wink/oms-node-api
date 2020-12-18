import { isBefore, isEqual } from "date-fns";
import parse from "date-fns/parse";
import moment from "moment";

const INVALID_DATE = "Invalid date";
const DATE_FORMAT = "YYYY-MM-DD";

export const isValidDate = (dateToValidate) => {
  try {
    if (moment(dateToValidate, DATE_FORMAT, true).format() === INVALID_DATE)
      return false;
    else return true;
  } catch (error) {
    return false;
  }
};

export const isNormalInteger = (str) => {
  return /^\+?(0|[1-9]\d*)$/.test(str);
};

export const isVallidDateRange = (fromDate, toDate) => {
  if (isValidDate(fromDate) && isValidDate(toDate)) {
    let fromParsed = parse(fromDate);
    let toParsed = parse(toDate);
    return isBefore(toParsed, fromParsed) || isEqual(toParsed, fromParsed);
  }
  return false;
};
