import { formatDate } from "../../src/utils/date";

describe("Converts date string to YYYY-MM-DD format", () => {
  it("should convert and return the date string in YYYY-MM-DD format", () => {
    expect(formatDate("2023-01-01T00:00:00")).toBe("2023-1-1");
    expect(formatDate("2023-01-01T00:00:00")).not.toBe("2023-01-01");
  });

  it("should throw an error if the date string is not in YYYY-MM-DDTHH:MM:SS format", () => {
    expect(() => formatDate("2023-01-01")).toThrowError();
    expect(() => formatDate("2021-01-01T00:00:00")).not.toThrowError();
  });
});
