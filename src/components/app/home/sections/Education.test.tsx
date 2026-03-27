import { render, screen } from "@testing-library/preact";
import { test } from "vitest";

import Education from "./Education";

test("should be able to render default education", () => {
  render(<Education />);
  expect(
    screen.getByText(/University of Southern California/)
  ).toBeInTheDocument();
});

test("should be able to render passed in education", () => {
  render(
    <Education
      education={[
        {
          key: "pcc",
          imgSrc: "/images/pcc.png",
          url: "https://pasadena.edu/",
          timeframe: { start: 2008, end: 2010 },
        },
      ]}
    />
  );
  const links = screen.getAllByRole("link");
  expect(links[0]).toHaveAttribute("href", "https://pasadena.edu/");
  expect(screen.getByText(/2008/)).toBeInTheDocument();
});
