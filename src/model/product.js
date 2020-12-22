import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequalizeDBConnect";
import logger from "../config/logger";

const Product = sequelize.define(
  "product",
  {
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "product_id",
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "product_name",
    },
    productType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "product_type",
    },
    productSellPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: "sell_price",
    },
    productBatchPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: "batch_price",
    },
    inStockQuantiy: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "in_stock_quantity",
    },
    prodMeasureUnit: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "product_measure_unit",
    },
  },
  {
    freezeTableName: true,
    tableName: "product",
    timestamps: false,
  }
);

logger.info("%s", Product === sequelize.models.Product);

Product.sync();

export default Product;
