import { screen, render } from "@testing-library/react";
import { test } from "vitest";
import HomePage from "./HomePage";

test("should render HomePage without crashing", () => {
  render(<HomePage portfolioItems={[]} />);
  // Hero
  expect(screen.getByText("cool and awesome")).toBeInTheDocument();
  // ThreeSellPoints
  expect(
    screen.getByText("Making the web awesome is my passion.")
  ).toBeInTheDocument();
  // Education
  expect(screen.getByText("Education")).toBeInTheDocument();
  // Portfolio
  expect(screen.getByText("Portfolio")).toBeInTheDocument();
});
