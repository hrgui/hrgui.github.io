import { render, screen } from "@testing-library/preact";

import Overlay from "./Overlay";

it("renders the overlay with base classes", () => {
  const { container } = render(<Overlay />);
  const root = container.firstElementChild as HTMLElement;
  expect(root).toBeInTheDocument();
});

it("merges a custom className with the base classes", () => {
  const { container } = render(<Overlay className="custom-class" />);
  const root = container.firstElementChild as HTMLElement;
  expect(root).toHaveClass("custom-class");
});

it("forwards additional props to the root div", () => {
  render(<Overlay data-testid="overlay" aria-hidden="true" />);
  const root = screen.getByTestId("overlay");
  expect(root).toBeInTheDocument();
  expect(root).toHaveAttribute("aria-hidden", "true");
});
