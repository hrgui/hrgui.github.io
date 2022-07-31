import { render, screen } from "@testing-library/react";
import { test } from "vitest";
import ThreeSellPoints from "./ThreeSellPoints";

test("should be able to render default ThreeSellPoints", () => {
  render(<ThreeSellPoints />);
  expect(
    screen.getByText(/Making the web awesome is my passion\./)
  ).toBeInTheDocument();
});
