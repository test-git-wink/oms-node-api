import request from "supertest";
import app from "../../index";

jest.mock("../../validation/orderValidation");
jest.mock("../../validation/commonValidation");
jest.mock("../../service/orderService");

describe("GET  /v1/customer-orders/order check", () => {
  test("OrderController.getOrderRoute should return success response", async () => {
    const response = await request(app)
      .get("/v1/customer-orders/order")
      .set("Accept", "application/json")
      .query({
        fromDate: "2020-12-01",
        toDate: "2020-12-31",
        page: "10",
        limit: "10",
      });
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });

  test("OrderController.getOrderRoute should return invalid input response", async () => {
    const response = await request(app)
      .get("/v1/customer-orders/order")
      .set("Accept", "application/json")
      .query({
        fromDate: "abs",
        toDate: "2020-12-31",
        page: "10",
        limit: "10",
      });
    expect(response.status).toEqual(400);
    expect(response.body).toBeDefined();
  });

  test("OrderController.getOrderRoute should return internal server error response", async () => {
    const response = await request(app)
      .get("/v1/customer-orders/order")
      .set("Accept", "application/json")
      .query({
        fromDate: "2020-12-01",
        toDate: "2020-12-31",
        page: "1000000000000000000000",
        limit: "10",
      });
    expect(response.status).toEqual(500);
    expect(response.body).toBeDefined();
  });
});
