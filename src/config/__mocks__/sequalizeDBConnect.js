import sequelize from "sequelize";

jest.mock("sequelize", () => {
  return { transaction: jest.fn(() => Promise.resolve()) };
});

sequelize.transaction.mockImplementation(() => {
  return Promise.resolve();
});
