import {
  isValidOrderRequest,
  isValidUserAddress,
  isValidOrderId,
  getValidOrderItemList,
  isValidNewOrderStatus,
  isValidPostOrderRequest,
} from "../orderValidation";

beforeAll(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

jest.mock("../../dao/userAddressDao");
jest.mock("../../dao/orderDao");
jest.mock("../../dao/productDao");

describe("isValidOrderRequest check", () => {
  test("should return true for {orderStatus:cancel}", () => {
    expect(isValidOrderRequest({ orderStatus: "cancel" })).toBeTruthy();
  });

  test("should return true for {orderStatus:cancel}", () => {
    expect(isValidOrderRequest({ orderStatus: "placed" })).toBeTruthy();
  });

  test("should return false for {orderStatus:approved}", () => {
    expect(isValidOrderRequest({ orderStatus: "approved" })).toBeFalsy();
  });

  test("should return false for {orderStatus:processing}", () => {
    expect(isValidOrderRequest({ orderStatus: "processing" })).toBeFalsy();
  });
  test("should return false for {orderStatus:fail}", () => {
    expect(isValidOrderRequest({ orderStatus: "fail" })).toBeFalsy();
  });

  test("should return false for {}", () => {
    expect(isValidOrderRequest({})).toBeFalsy();
  });
});

describe("isValidUserAddress check", () => {
  it("should return true for 1,1", async () => {
    expect.assertions(1);
    let data = await isValidUserAddress(1, 1);

    expect(data).toBeTruthy();
  });

  it("should return false for 10,10", async () => {
    expect.assertions(1);
    let data = await isValidUserAddress(100, 10);

    expect(data).toBeFalsy();
  });

  it("should return false by exception", async () => {
    expect.assertions(1);
    let data = await isValidUserAddress(100, 10000000000000000000000000000000);

    expect(data).toBeFalsy();
  });
});

describe("isValidOrderId check", () => {
  test("shoudl return true for 1", async () => {
    expect.assertions(1);
    let data = await isValidOrderId(1);

    expect(data).toBeTruthy();
  });

  test("shoudl return false for 10", async () => {
    expect.assertions(1);
    let data = await isValidOrderId(10);

    expect(data).toBeFalsy();
  });
});

describe("getValidOrderItemList check", () => {
  test("should return length 2 array for 2 valid order items", async () => {
    expect.assertions(2);
    let itemList = [
      {
        productId: "PROD_11223",
        quantity: 30,
      },
      {
        productId: "PROD_11224",
        quantity: 30,
      },
    ];
    let data = await getValidOrderItemList(itemList);

    expect(data instanceof Array).toBeTruthy();
    expect(data.length).toBe(2);
  });

  test("should return length 1 array for 1 valid order items", async () => {
    expect.assertions(2);
    let itemList = [
      {
        productId: "PROD_11223",
        quantity: 30,
      },
    ];
    let data = await getValidOrderItemList(itemList);

    expect(data instanceof Array).toBeTruthy();
    expect(data.length).toEqual(1);
  });

  test("should return length 1 array for 1 valid order items list with 2 items", async () => {
    expect.assertions(2);
    let itemList = [
      {
        productId: "PROD_11223",
        quantity: 30,
      },
      {
        productId: "PROD_11324",
        quantity: 30,
      },
    ];

    let data = await getValidOrderItemList(itemList);

    expect(data instanceof Array).toBeTruthy();
    expect(data.length).toBe(1);
  });

  test("should return length 0 array for 0 valid order items list with 0 items", async () => {
    expect.assertions(2);
    let itemList = [];

    let data = await getValidOrderItemList(itemList);

    expect(data instanceof Array).toBeTruthy();
    expect(data.length).toBe(0);
  });

  test("should return length 0 array for 2 valid order items with higher quantity than in stock list with 2 items", async () => {
    expect.assertions(2);
    let itemList = [
      {
        productId: "PROD_11223",
        quantity: 3000,
      },
      {
        productId: "PROD_11224",
        quantity: 30000,
      },
    ];

    let data = await getValidOrderItemList(itemList);

    expect(data instanceof Array).toBeTruthy();
    expect(data.length).toBe(0);
  });
});

describe("isValidNewOrderStatus check", () => {
  test("should return true for valid order status and false for invalid", () => {
    expect(isValidNewOrderStatus("placed")).toBeTruthy();

    expect(isValidNewOrderStatus("cancel")).toBeTruthy();

    expect(isValidNewOrderStatus("2323")).toBeFalsy();
  });
});

describe("isValidPostOrderRequest check", () => {
  test("should return true for valid order request", async () => {
    expect.assertions(1);
    let request1 = {
      userId: 1,
      orderItemList: [
        {
          productId: "PROD_11223",
          quantity: 30,
        },
        {
          productId: "PROD_11224",
          quantity: 30,
        },
      ],
      orderStatus: "placed",
      shipmentDate: "2020-12-31",
      userAddresID: 1,
    };
    let data1 = await isValidPostOrderRequest(request1);
    expect(data1).toBeTruthy();
  });

  test("should return false for invalid userid useradressid combination ", async () => {
    let request2 = {
      userId: 10,
      orderItemList: [
        {
          productId: "PROD_11223",
          quantity: 30,
        },
        {
          productId: "PROD_11224",
          quantity: 30,
        },
      ],
      orderStatus: "placed",
      shipmentDate: "2020-12-31",
      userAddresID: 10,
    };
    let data2 = await isValidPostOrderRequest(request2);
    expect(data2).toBeFalsy();
  });

  test("should return false for invalid order items", async () => {
    let request3 = {
      userId: 1,
      orderItemList: [
        {
          productId: "PROD_11923",
          quantity: 30,
        },
        {
          productId: "PROD_11124",
          quantity: 30,
        },
      ],
      orderStatus: "placed",
      shipmentDate: "2020-12-31",
      userAddresID: 1,
    };

    let data3 = await isValidPostOrderRequest(request3);
    expect(data3).toBeFalsy();
  });
});
