import "@testing-library/jest-dom";
import { vi } from "vitest";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import en from "~/i18n/locales/en";

function resolveTranslationKey(
   
  obj: Record<string, any>,
  key: string
): string {
  const parts = key.split(".");
   
  let current: any = obj;
  for (const part of parts) {
    if (typeof current !== "object" || current === null) return key;
    current = current[part];
  }
  return typeof current === "string" ? current : key;
}

vi.mock("~/i18n/context", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      let str = resolveTranslationKey(
        en as unknown as Record<string, unknown>,
        key
      );
      if (opts) {
        str = Object.entries(opts).reduce(
          (s, [k, v]) => s.replace(`{{${k}}}`, String(v)),
          str
        );
      }
      return str;
    },
  }),
   
  I18nProvider: ({ children }: { children: any }) => children,
}));

Element.prototype.scrollTo = () => {};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("prefers-reduced-motion: reduce"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
