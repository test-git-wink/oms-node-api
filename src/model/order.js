import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequalizeDBConnect";
import logger from "../config/logger";

const Order = sequelize.define(
  "orders",
  {
    orderId: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "order_id",
    },
    orderTotalPrice: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "order_total_price",
    },
    orderTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "order_timestamp",
    },
    orderStatus: {
      type: DataTypes.ENUM(
        "fail",
        "approved",
        "processing",
        "placed",
        "cancel"
      ),
      allowNull: false,
      field: "order_status",
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "user_id",
    },
    deliveryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "delivery_id",
    },
    invoiceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "invoice_id",
    },
  },
  {
    freezeTableName: true,
    tableName: "orders",
    timestamps: false,
  }
);

logger.info("%s", Order === sequelize.models.Order);

Order.sync();

export default Order;
