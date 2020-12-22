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

// export async const checkConnection=()=>{
//     try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
//   return true
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
//   return false
// }
// }

// export const closeConnection=()=>{
//     try {
//    sequelize.close();
//   console.log('Connection has been closed successfully.');

// } catch (error) {
//   console.error('Unable to close:', error);
//    false
// }
// }
