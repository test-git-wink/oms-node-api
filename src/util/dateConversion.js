import { addDays } from "date-fns";
import format from "date-fns/format";
import { startOfDay } from "date-fns";
import { endOfDay } from "date-fns";

export const getEndofDay = (date) => {
  return format(endOfDay(addDays(new Date(date), 1)), "yyyy-MM-dd HH:mm:ss");
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
