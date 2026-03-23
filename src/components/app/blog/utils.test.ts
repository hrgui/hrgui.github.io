import { describe, expect, test } from "vitest";

import { toDisplayDate } from "./utils";

describe("toDisplayDate", () => {
  test("returns UNKNOWN when no date is provided", () => {
    expect(toDisplayDate()).toBe("UNKNOWN");
    expect(toDisplayDate(undefined)).toBe("UNKNOWN");
  });

  test("returns the raw string when it cannot be parsed as a date", () => {
    expect(toDisplayDate("not-a-date")).toBe("not-a-date");
  });

  test("formats a valid ISO date string as a US long-form date", () => {
    expect(toDisplayDate("2026-03-23")).toBe("March 23, 2026");
  });

  test("formats January correctly", () => {
    expect(toDisplayDate("2024-01-01")).toBe("January 1, 2024");
  });

  test("formats December correctly", () => {
    expect(toDisplayDate("2023-12-31")).toBe("December 31, 2023");
  });

  test("does not shift the day due to timezone offset", () => {
    // Dates stored as YYYY-MM-DD should not drift to the previous day
    expect(toDisplayDate("2025-07-04")).toBe("July 4, 2025");
  });
});
