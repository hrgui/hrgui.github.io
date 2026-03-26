import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import TechnologiesUsed from "./TechnologiesUsed";

const data = [
  { type: "CSS", value: 91.3 },
  { type: "HTML", value: 8.7 },
];

it("renders the section heading", () => {
  render(<TechnologiesUsed data={data} />);
  expect(screen.getByText("Technologies Used")).toBeInTheDocument();
});

it("renders each technology type in the legend", () => {
  render(<TechnologiesUsed data={data} />);
  expect(screen.getByText("CSS")).toBeInTheDocument();
  expect(screen.getByText("HTML")).toBeInTheDocument();
});

it("renders the correct percentage for each technology", () => {
  render(<TechnologiesUsed data={data} />);
  expect(screen.getByText("91%")).toBeInTheDocument();
  expect(screen.getByText("9%")).toBeInTheDocument();
});

it("shows fallback message when no data is provided", () => {
  render(<TechnologiesUsed />);
  expect(screen.getByText("No technology data available.")).toBeInTheDocument();
});

it("shows fallback message when data is an empty array", () => {
  render(<TechnologiesUsed data={[]} />);
  expect(screen.getByText("No technology data available.")).toBeInTheDocument();
});

it("filters out items with zero value", () => {
  render(
    <TechnologiesUsed
      data={[
        { type: "CSS", value: 100 },
        { type: "HTML", value: 0 },
      ]}
    />
  );
  expect(screen.getByText("CSS")).toBeInTheDocument();
  expect(screen.queryByText("HTML")).not.toBeInTheDocument();
});

it("highlights a legend item on hover and restores on mouse leave", async () => {
  const user = userEvent.setup();
  render(<TechnologiesUsed data={data} />);

  const cssItem = screen.getByText("CSS").closest("li")!;
  await user.hover(cssItem);
  // After hover, the CSS item should have an inline background style applied
  expect(cssItem.style.backgroundColor).not.toBe("");

  await user.unhover(cssItem);
  expect(cssItem.style.backgroundColor).toBe("");
});
