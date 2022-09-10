import { render, screen } from "@testing-library/preact";
import { test } from "vitest";

import Hero from "./Hero";

test("should be able to render default Hero", () => {
  render(<Hero />);
  expect(screen.getByText(/cool and awesome/)).toBeInTheDocument();
});
