import { render, screen } from "@testing-library/preact";

import Link from "./Link";

it("should be able to override className defaults", () => {
  render(
    <Link className="text-blue-700 dark:text-blue-500" href="/">
      Test
    </Link>
  );
  const link = screen.getByText("Test");
  expect(link).toBeInTheDocument();
  expect(link).toHaveClass("text-blue-700");
  expect(link).not.toHaveClass("text-red-700");
});
