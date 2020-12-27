import {
  isEmpty,
  isValidDate,
  isValidNumber,
  isVallidDateRange,
} from "../commonValidation";

describe("isValidDate check", () => {
  test("shoud return true for 2020-12-21", () => {
    expect(isValidDate("2020-12-21")).toBeTruthy();
  });

  test("shoud return false for 2020-15-21", () => {
    expect(isValidDate("2020-15-21")).toBeFalsy();
  });

  test("shoud return false for eweff23", () => {
    expect(isValidDate("eweff23")).toBeFalsy();
  });
});

describe("isValidNumber check", () => {
  test("shoud return true for 2020", () => {
    expect(isValidNumber("2020")).toBeTruthy();
  });

  test("shoud return false for abs", () => {
    expect(isValidNumber("abs")).toBeFalsy();
  });

  test("shoud return false for 2020-15-21", () => {
    expect(isValidNumber("2020-15-21")).toBeFalsy();
  });

  test("shoud return false for -23", () => {
    expect(isValidNumber("-23")).toBeFalsy();
  });
});

describe("isEmpty check", () => {
  test("shoud return false for {orderStatus:'placed'}", () => {
    expect(isEmpty({ orderStatus: "placed" })).toBeFalsy();
  });

  test("shoud return true for {}", () => {
    expect(isEmpty({})).toBeTruthy();
  });
});

describe("isVallidDateRange check", () => {
  test("shoud return true for '2020-12-21' to '2020-12-31'", () => {
    expect(isVallidDateRange("2020-12-21", "2020-12-31")).toBeTruthy();
  });

  test("shoud return false for '2020-12-21' to '2020-10-31'", () => {
    expect(isVallidDateRange("2020-12-21", "2020-10-31")).toBeFalsy();
  });

  test("shoud return false for '2020-15-21' to '2020-10-31'", () => {
    expect(isVallidDateRange("2020-15-21", "2020-10-31")).toBeFalsy();
  });

  test("shoud return false for '2020-10-21' to '2020-10-310'", () => {
    expect(isVallidDateRange("2020-10-21", "2020-10-310")).toBeFalsy();
  });
});
