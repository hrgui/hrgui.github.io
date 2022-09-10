import { render, screen } from "@testing-library/preact";
import { test } from "vitest";

import BlogEntry from "./BlogEntry";

test("should be able to render no posts without crashing", async () => {
  render(<BlogEntry>{<div>This is a sample blog post.</div>}</BlogEntry>);
  expect(screen.getByText(/This is a sample blog post/)).toBeInTheDocument();
});
