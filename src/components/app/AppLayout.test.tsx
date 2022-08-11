import { screen, render, within } from "@testing-library/preact";
import { test } from "vitest";
import AppLayout from "./AppLayout";

test("it should render a desktop nav and a footer, and accepts a child", () => {
  render(<AppLayout>Hello World</AppLayout>);

  expect(screen.getByText(/Hello World/)).toBeInTheDocument();

  const desktopNav = within(screen.getByTestId("desktop-nav"));
  expect(desktopNav.getByText(/Home/)).toBeInTheDocument();
  expect(desktopNav.getByText(/Blog/)).toBeInTheDocument();
  expect(desktopNav.getByText(/Portfolio/)).toBeInTheDocument();

  expect(screen.getByTestId("footer")).toBeInTheDocument();
});
