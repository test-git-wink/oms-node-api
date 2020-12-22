import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequalizeDBConnect";
import logger from "../config/logger";

const OrderItem = sequelize.define(
  "order_item",
  {
    orderItemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "order_item_id",
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "quantity",
    },
    orderProductTotalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "order_product_total_price",
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "product_id",
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "order_id",
    },
  },
  {
    freezeTableName: true,
    tableName: "order_item",
    timestamps: false,
  }
);

logger.info("%s", OrderItem === sequelize.models.OrderItem);

OrderItem.sync();

export default OrderItem;
