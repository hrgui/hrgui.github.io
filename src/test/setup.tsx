import "@testing-library/jest-dom";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

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
