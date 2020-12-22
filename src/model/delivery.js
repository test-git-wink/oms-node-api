import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequalizeDBConnect";
import logger from "../config/logger";

const Delivery = sequelize.define(
  "delivery",
  {
    deliveryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "delivery_id",
    },
    deliveryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "delivery_date",
    },
    userAddressId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "user_address_id",
    },
    deliveryStatus: {
      type: DataTypes.ENUM("fail", "delivered", "pending", "cancel"),
      allowNull: false,
      field: "delivery_status",
    },
  },
  {
    freezeTableName: true,
    tableName: "delivery",
    timestamps: false,
  }
);

logger.info("%s", Delivery === sequelize.models.Delivery);

Delivery.sync();

export default Delivery;
