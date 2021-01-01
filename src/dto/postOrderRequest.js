import Ajv from "ajv";
import moment from "moment";
import { OrderStatusConst } from "../constants/orderStatus";

const ajv = new Ajv();

ajv.addKeyword("isNotEmpty", {
  type: "string",
  validate(schema, data) {
    return typeof data === "string" && data.trim() !== "";
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

const orderItemListSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      productId: {
        type: "string",
      },
      quantity: {
        type: "number",
      },
    },
    additionalProperties: false,
    required: ["productId", "quantity"],
  },
};

const postOrderSchema = {
  type: "object",
  properties: {
    userId: {
      type: ["string", "number"],
      pattern: "^[0-9]+$",

      isNotEmpty: true,
    },
    orderItemList: orderItemListSchema,
    orderStatus: {
      type: "string",
      enum: [
        OrderStatusConst.PLACED,
        OrderStatusConst.PROCESSING,
        OrderStatusConst.APPROVED,
      ],
      shipmentDate: {
        type: ["string"],
        isNotEmpty: true,
        isValidDate: true,
      },
      userAddresID: {
        type: ["string", "number"],
        pattern: "^[0-9]+$",

        isNotEmpty: true,
      },
    },
  },
};

export const validatePostOrder = ajv.compile(postOrderSchema);
