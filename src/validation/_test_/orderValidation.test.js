import { isValidOrderId, isValidOrderRequest } from "../orderValidation";
// import { countByOrderIdDao } from "../_mocks_/orderValidationDaoMocks";

jest.mock("../../dao/orderDao");

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

const countByOrderIdDao = jest.fn();
countByOrderIdDao.mockImplementation((x) => {
  if (x === 1) return 1;
  if (x === 10) return 0;
});
describe("isValidOrderId check", () => {
  it("should return false for 10", async () => {
    expect(isValidOrderId(10)).toBeFalsy();
  });
});
