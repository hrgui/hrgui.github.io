import { render, screen } from "@testing-library/preact";

import Drawer from "./Drawer";

it("renders children", () => {
  render(<Drawer>Drawer content</Drawer>);
  expect(screen.getByText("Drawer content")).toBeInTheDocument();
});

it("renders closed by default without error", () => {
  render(<Drawer data-testid="drawer" />);
  expect(screen.getByTestId("drawer")).toBeInTheDocument();
});

it("renders open without error", () => {
  render(<Drawer isOpen data-testid="drawer" />);
  expect(screen.getByTestId("drawer")).toBeInTheDocument();
});

it("forwards additional props to the aside element", () => {
  render(<Drawer data-testid="drawer" aria-label="Navigation" />);
  const aside = screen.getByTestId("drawer");
  expect(aside).toHaveAttribute("aria-label", "Navigation");
});
