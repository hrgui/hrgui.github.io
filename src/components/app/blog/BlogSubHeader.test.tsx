import { render, screen } from "@testing-library/preact";
import { test } from "vitest";

import BlogSubHeader from "./BlogSubHeader";

test("should be able to render no posts without crashing", () => {
  render(<BlogSubHeader title="My Title" date="5/29/2022" />);
  expect(screen.getByText(/My Title/)).toBeInTheDocument();
  expect(screen.getByText("5/29/2022")).toBeInTheDocument();
});
