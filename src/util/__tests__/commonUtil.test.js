import { getOffset } from "../commonUtil";

describe("getoffset test", () => {
  test("test getOffset(1, 10) offest 0", () => {
    expect(getOffset(1, 10)).toBe(0);
  });

  test("test getOffset(0, 10) offest 0", () => {
    expect(getOffset(0, 10)).toBe(0);
  });

  test("test getOffset(10, 10) positive or 0", () => {
    expect(getOffset(10, 10)).toBe(90);
  });

  test("test getOffset(-1, 10) offest 0", () => {
    expect(getOffset(-1, 10)).toBe(0);
  });
});
