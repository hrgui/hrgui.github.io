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
          title: "Pasadena City College",
          description: "",
          timeframe: { start: 2008, end: 2010 },
        },
      ]}
    />
  );
  expect(screen.getByText(/Pasadena City College/)).toBeInTheDocument();
});
