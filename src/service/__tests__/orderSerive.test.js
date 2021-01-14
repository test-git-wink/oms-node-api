import OrderService from "../orderService";

beforeAll(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

jest.mock("../../dao/orderDao");
jest.mock("../../validation/orderValidation");

jest.mock("../../dao/deliveryDao");
jest.mock("../../dao/productDao");
jest.mock("../../dao/orderItemDao");

describe("OrderService constructor check", () => {
  it("class constructor check", () => {
    const orderService = new OrderService();
    expect(orderService instanceof OrderService).toBeTruthy();
  });
});

describe("OrderService.getOrders check", () => {
  test("should return empty list for fromDate=2020-12-01,toDate=2020-12-31,page=0,limit=10", async () => {
    expect.assertions(1);
    const orderService = new OrderService();
    let req = {
      fromDate: "2020-12-01",
      toDate: "2020-12-31",
      page: "0",
      limit: "10",
    };
    let data = await orderService.getOrders(req);
    expect(data).toEqual({ result: [], orderCount: 1 });
  });
});

describe("OrderService.cancelOrder check", () => {
  test("should return 1 or above positve number for valid cancellation", async () => {
    expect.assertions(1);
    let orderId = 1;
    let updateReq = { orderStatus: "cancel" };
    const orderService = new OrderService();
    let data = await orderService.cancelOrder(orderId, updateReq);
    expect(data).toBe(1);
  });

  test("should return 0 for invalid order id", async () => {
    expect.assertions(1);
    let orderId = 100;
    let updateReq = { orderStatus: "cancel" };
    const orderService = new OrderService();
    let data = await orderService.cancelOrder(orderId, updateReq);
    expect(data).toBe(0);
  });

  test("should return 0 for invalid order status", async () => {
    expect.assertions(1);
    let orderId = 1;
    let updateReq = { orderStatus: "fail" };
    const orderService = new OrderService();
    let data = await orderService.cancelOrder(orderId, updateReq);
    expect(data).toBe(0);
  });
});

describe("OrderService.placeOrder check", () => {
  test("should return postive number for valid order place", async () => {
    expect.assertions(1);

    let orderReq1 = {
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
    const orderService = new OrderService();

    let data = await orderService.placeOrder(orderReq1);
    expect(data > 0).toBeTruthy();
  });

  test("should throw exception for internal error", async () => {
    expect.assertions(1);
    let orderReq2 = {
      userId: 2,
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
      userAddresID: 10,
    };
    const orderService = new OrderService();
    await expect(orderService.placeOrder(orderReq2)).rejects.toThrow(
      new Error("transaction is not defined")
    );
  });
});
