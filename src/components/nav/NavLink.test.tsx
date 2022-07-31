import { it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavLink } from "./NavLink";
import userEvent from "@testing-library/user-event";

it("should render a link that accepts Text, and can accept an onClick", async () => {
  const handleClick = vi.fn();
  render(
    <NavLink currentPathName="/" href="test" onClick={handleClick}>
      Test
    </NavLink>
  );
  const link = screen.getByText(/Test/);
  expect(link).toBeInTheDocument();
  await userEvent.click(link);
  expect(handleClick).toHaveBeenCalled();
  expect(link.getAttribute("aria-current")).toMatchInlineSnapshot("null");
});

it("should be able to render current page link", async () => {
  const handleClick = vi.fn();
  render(
    <NavLink currentPathName={"/test"} href="/test" onClick={handleClick}>
      Test
    </NavLink>
  );
  const link = screen.getByText(/Test/);
  expect(link).toBeInTheDocument();
  expect(link.getAttribute("aria-current")).toMatchInlineSnapshot('"page"');
});
