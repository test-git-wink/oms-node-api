import { addDays, format } from "date-fns";

const DELIVERY_DATE_FORMAT = "yyyy-MM-dd";

export const getDeliveryDate = () => {
  return format(addDays(new Date(), 7), DELIVERY_DATE_FORMAT);
};

export const getInvoiceId = () => {
  return Math.random().toString().slice(2, 9);
};

export const getOrderTimeStamp = () => {
  return format(new Date(), "yyyy-MM-dd HH:mm:ss");
};
