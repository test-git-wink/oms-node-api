import {
  getDeliveryAddres,
  getInvoiceId,
  getOrderTimeStamp,
  getDeliveryDate,
} from "../orderUtil";
import moment from "moment";

describe("getDeliveryAddres", () => {
  test("getDeliveryAddres(232, xyza lane, xyza city,xyza state, NZ) should retrun 232 , xyza lane , xyza city , xyza state , NZ", () => {
    expect(
      getDeliveryAddres("232", "xyza lane", "xyza city", "xyza state", "NZ")
    ).toBe("232 , xyza lane , xyza city , xyza state , NZ");
  });
  test("getDeliveryAddres() should return empty string", () => {
    expect(getDeliveryAddres("", "", "", "", "")).toBe("");
  });
});

describe("getInvoiceId", () => {
  test("getInvoiceId should string with 7 numbers", () => {
    expect(getInvoiceId()).toMatch(/^\d{7}$/);
  });
});

describe("getOrderTimeStamp", () => {
  test("getOrderTimeStamp() should return time stamp in yyyy-MM-dd HH:mm:ss format", () => {
    expect(
      moment(getOrderTimeStamp(), "YYYY-MM-DD HH:mm:ss", true).format()
    ).not.toEqual("Invalid date");
  });
});

describe("getDeliveryDate", () => {
  test("getDeliveryDate() should return time stamp in yyyy-MM-dd format", () => {
    expect(moment(getDeliveryDate(), "YYYY-MM-DD", true).format()).not.toEqual(
      "Invalid date"
    );
  });
});
