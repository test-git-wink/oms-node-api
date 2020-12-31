import Ajv from "ajv";
import moment from "moment";

const ajv = new Ajv();

const INVALID_DATE = "Invalid date";
const DATE_FORMAT = "YYYY-MM-DD";

ajv.addKeyword("isNotEmpty", {
  type: "string",
  validate(schema, data) {
    return typeof data === "string" && data.trim() !== "";
  },
  errors: false,
});

ajv.addKeyword("isNumber", {
  type: "string",
  validate(schema, data) {
    return Number(data);
  },
  errors: false,
});

ajv.addKeyword("isValidDate", {
  type: "string",
  validate(schema, data) {
    return moment(data, DATE_FORMAT, true).format() != INVALID_DATE;
  },
  errors: false,
});

const getOrdersSchema = {
  title: "getOrderRequest",
  type: "object",
  properties: {
    fromDate: {
      type: ["string"],
      isNotEmpty: true,
      isValidDate: true,
    },
    toDate: {
      type: ["string"],
      isNotEmpty: true,
      isValidDate: true,
    },
    page: {
      type: ["string", "number"],
      pattern: "^[0-9]+$",
      // isNumber: true,
      isNotEmpty: true,
    },
    limit: {
      type: ["string", "number"],
      pattern: "^[0-9]+$",
      // isNumber: true,
      isNotEmpty: true,
    },
  },
  required: ["fromDate", "toDate", "page", "limit"],
};

export const validateGetOrders = ajv.compile(getOrdersSchema);
