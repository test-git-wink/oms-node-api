import { TestScheduler } from "jest";
import {
  getEndofDay,
  getFromToDateRange,
  getStartofDay,
} from "../dateConversion";

describe("getEndofDay test", () => {
  test("should return end of the day with time", () => {
    expect(getEndofDay("2020-12-21")).toBe("2020-12-21 23:59:59");
  });
});

describe("getEndofDay test", () => {
  test("should return start of day", () => {
    expect(getStartofDay("2020-12-21")).toBe("2020-12-21 00:00:00");
  });
});

describe("getFromToDateRange test", () => {
  test("should date range(2020-12-21 to 2020-12-31) ", () => {
    expect(getFromToDateRange("2020-12-21", "2020-12-31")).toEqual({
      fromDate: "2020-12-21 00:00:00",
      toDate: "2020-12-31 23:59:59",
    });
  });
});
