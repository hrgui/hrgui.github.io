import { screen, render, within } from "@testing-library/react";
import { test, vi } from "vitest";
import AppLayout from "./AppLayout";

vi.mock("next/dist/client/router", () => require("next-router-mock"));
vi.mock("next/router", () => require("next-router-mock"));

test("it should render a desktop nav and a footer, and accepts a child", () => {
  render(<AppLayout>Hello World</AppLayout>);

  expect(screen.getByText(/Hello World/)).toBeInTheDocument();

  const desktopNav = within(screen.getByTestId("desktop-nav"));
  expect(desktopNav.getByText(/Home/)).toBeInTheDocument();
  expect(desktopNav.getByText(/Blog/)).toBeInTheDocument();
  expect(desktopNav.getByText(/Portfolio/)).toBeInTheDocument();

  expect(screen.getByTestId("footer")).toBeInTheDocument();
});
