import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("sysco_oms", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
});
