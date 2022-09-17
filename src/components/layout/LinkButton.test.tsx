import { render, screen } from "@testing-library/preact";

import LinkButton from "./LinkButton";

it("should be able to override className defaults", () => {
  render(
    <LinkButton className="text-blue-700 dark:text-blue-500" href="/">
      Test
    </LinkButton>
  );
  const linkButton = screen.getByText("Test");
  expect(linkButton).toBeInTheDocument();
  expect(linkButton).toHaveClass("text-blue-700");
  expect(linkButton).not.toHaveClass("text-red-700");
});
