import { endOfDay, startOfDay } from "date-fns";
import format from "date-fns/format";

export const getEndofDay = (date) => {
  return format(endOfDay(new Date(date)), "yyyy-MM-dd HH:mm:ss");
};

export const getStartofDay = (date) => {
  return format(startOfDay(new Date(date)), "yyyy-MM-dd HH:mm:ss");
};

export const getFromToDateRange = (from, to) => {
  return {
    fromDate: getStartofDay(from),
    toDate: getEndofDay(to),
  };
};
