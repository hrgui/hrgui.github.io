import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  hexToRgba,
  getTechColor,
  getReadableTechTextColor,
  getTechBadgeStyle,
  techColors,
  fallbackTechColors,
} from "./technologyColors";

describe("hexToRgb", () => {
  it("converts a 6-digit hex to rgb components", () => {
    expect(hexToRgb("#e34c26")).toEqual({ r: 227, g: 76, b: 38 });
  });

  it("works without a leading #", () => {
    expect(hexToRgb("e34c26")).toEqual({ r: 227, g: 76, b: 38 });
  });

  it("expands a 3-digit hex to 6 digits before converting", () => {
    // #fff → #ffffff
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    // #000 → #000000
    expect(hexToRgb("#000")).toEqual({ r: 0, g: 0, b: 0 });
  });
});

describe("hexToRgba", () => {
  it("returns an rgba string with the given alpha", () => {
    expect(hexToRgba("#e34c26", 0.5)).toBe("rgba(227, 76, 38, 0.5)");
  });

  it("accepts alpha of 0 and 1", () => {
    expect(hexToRgba("#ffffff", 0)).toBe("rgba(255, 255, 255, 0)");
    expect(hexToRgba("#000000", 1)).toBe("rgba(0, 0, 0, 1)");
  });
});

describe("getTechColor", () => {
  it("returns the known color for a recognised type (case-insensitive)", () => {
    expect(getTechColor("CSS", 0)).toBe(techColors.CSS);
    expect(getTechColor("css", 0)).toBe(techColors.CSS);
    expect(getTechColor("JavaScript", 0)).toBe(techColors.JAVASCRIPT);
  });

  it("returns a fallback color for an unknown type", () => {
    expect(getTechColor("UNKNOWN", 0)).toBe(fallbackTechColors[0]);
    expect(getTechColor("UNKNOWN", 1)).toBe(fallbackTechColors[1]);
  });

  it("wraps fallback colors using modulo when index exceeds array length", () => {
    expect(getTechColor("UNKNOWN", fallbackTechColors.length)).toBe(
      fallbackTechColors[0]
    );
  });

  it("uses the fallback color when type is undefined", () => {
    expect(getTechColor(undefined, 2)).toBe(fallbackTechColors[2]);
  });
});

describe("getReadableTechTextColor", () => {
  it("returns a color-mix expression using the provided hex", () => {
    const result = getReadableTechTextColor("#f1e05a");
    expect(result).toBe(
      "color-mix(in srgb, var(--color-on-surface) 82%, #f1e05a 18%)"
    );
  });
});

describe("getTechBadgeStyle", () => {
  it("returns an object with backgroundColor, borderColor, color, and boxShadow", () => {
    const style = getTechBadgeStyle("CSS", 0);
    const color = techColors.CSS;
    expect(style.backgroundColor).toBe(hexToRgba(color, 0.2));
    expect(style.borderColor).toBe(hexToRgba(color, 0.72));
    expect(style.color).toBe(getReadableTechTextColor(color));
    expect(style.boxShadow).toBe(`inset 0 0 0 1px ${hexToRgba(color, 0.18)}`);
  });

  it("uses the fallback color for unknown types", () => {
    const style = getTechBadgeStyle("UNKNOWN", 0);
    const color = fallbackTechColors[0];
    expect(style.backgroundColor).toBe(hexToRgba(color, 0.2));
  });
});
