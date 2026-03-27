import { describe, expect, test, vi, afterEach } from "vitest";

import { toDisplayDate, isNew } from "./utils";

describe("isNew", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("returns false when no date is provided", () => {
    expect(isNew()).toBe(false);
    expect(isNew(undefined)).toBe(false);
  });

  test("returns false for an invalid date string", () => {
    expect(isNew("not-a-date")).toBe(false);
  });

  test("returns true when post date is exactly now", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-27T12:00:00Z"));
    expect(isNew("2026-03-27")).toBe(true);
  });

  test("returns true when post date is 23 hours ago", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-27T12:00:00Z"));
    expect(isNew("2026-03-26T13:00:00Z")).toBe(true);
  });

  test("returns false when post date is more than 24 hours ago", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-27T12:00:00Z"));
    expect(isNew("2026-03-26T11:59:59Z")).toBe(false);
  });

  test("returns false when post date is in the future", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-27T12:00:00Z"));
    expect(isNew("2026-03-28")).toBe(false);
  });
});

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
