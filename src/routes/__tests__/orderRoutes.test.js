import request from "supertest";
import app from "../../index";

jest.mock("../../validation/orderValidation");
jest.mock("../../validation/commonValidation");
jest.mock("../../service/orderService");

describe("GET  /v1/customer-orders/order check", () => {
  test("OrderController.getOrderRoute should return success response", async () => {
    const response = await request(app)
      .get("/v1/customer-orders/orders")
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
      .get("/v1/customer-orders/orders")
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
      .get("/v1/customer-orders/orders")
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

describe("PACTH  v1/customer-orders/orders/{orderId} check", () => {
  test("OrderController.updateOrderRoute should return success response valid request", async () => {
    let orderId = 1;
    let body = {
      orderStatus: "cancel",
    };
    const response = await request(app)
      .patch(`/v1/customer-orders/orders/${orderId}`)
      .set("Accept", "application/json")
      .send(body);

    expect(response.status).toEqual(204);
    expect(response.body).toBeDefined();
  });

  test("OrderController.updateOrderRoute should return invalid inputs response for invalid order id", async () => {
    let orderId = 10;
    let body = {
      orderStatus: "cancel",
    };
    const response = await request(app)
      .patch(`/v1/customer-orders/orders/${orderId}`)
      .set("Accept", "application/json")
      .send(body);

    expect(response.status).toEqual(400);
    expect(response.body).toBeDefined();
  });

  test("OrderController.updateOrderRoute should return internal server error", async () => {
    let orderId = 101;
    let body = {
      orderStatus: "cancel",
    };
    const response = await request(app)
      .patch(`/v1/customer-orders/orders/${orderId}`)
      .set("Accept", "application/json")
      .send(body);

    expect(response.status).toEqual(500);
    expect(response.body).toBeDefined();
  });
});

describe("POST  /v1/customer-orders/order/ check", () => {
  test("OrderController.placeOrder should return success response valid request", async () => {
    let req1 = {
      userId: 1,
      orderItemList: [
        {
          productId: "PROD_11223",
          quantity: 30,
        },
        {
          productId: "PROD_11324",
          quantity: 30,
        },
      ],
      orderStatus: "placed",
      shipmentDate: "2020-12-31",
      userAddresID: 1,
    };
    const response = await request(app)
      .post(`/v1/customer-orders/orders`)
      .set("Accept", "application/json")
      .send(req1);

    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
  });

  test("OrderController.placeOrder should return invalid inputs response for invalid order request", async () => {
    let req2 = {
      userId: 1,
      orderItemList: [
        {
          productId: "abs",
          quantity: 30,
        },
        {
          productId: "abc_",
          quantity: 30,
        },
      ],
      orderStatus: "placed",
      shipmentDate: "2020-12-31",
      userAddresID: 1,
    };

    const response = await request(app)
      .post(`/v1/customer-orders/orders`)
      .set("Accept", "application/json")
      .send(req2);

    expect(response.status).toEqual(400);
    expect(response.body).toBeDefined();
  });

  test("OrderController.placeOrder should return return internal server error", async () => {
    let req3 = {
      userId: 1,
      orderItemList: [
        {
          productId: "PROD_11223",
          quantity: 30,
        },
        {
          productId: "PROD_11324",
          quantity: 30,
        },
      ],
      orderStatus: "placed",
      shipmentDate: "2020-12-31",
      userAddresID: 1,
    };

    const response = await request(app)
      .post(`/v1/customer-orders/orders`)
      .set("Accept", "application/json")
      .send(req3);

    expect(response.status).toEqual(500);
    expect(response.body).toBeDefined();
  });
});
