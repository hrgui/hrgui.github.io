import "@testing-library/jest-dom";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// eslint-disable-next-line @typescript-eslint/no-empty-function
Element.prototype.scrollTo = () => {};
