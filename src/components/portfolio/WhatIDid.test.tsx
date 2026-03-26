import { render, screen } from "@testing-library/preact";

import WhatIDid from "./WhatIDid";

it("renders the section heading", () => {
  render(<WhatIDid whatIDid={[]} />);
  expect(screen.getByText("What I Did")).toBeInTheDocument();
});

it("renders each bullet item", () => {
  render(
    <WhatIDid whatIDid={["Built the UI", "Wrote tests", "Deployed app"]} />
  );
  expect(screen.getByText("Built the UI")).toBeInTheDocument();
  expect(screen.getByText("Wrote tests")).toBeInTheDocument();
  expect(screen.getByText("Deployed app")).toBeInTheDocument();
});

it("renders the correct number of list items", () => {
  render(<WhatIDid whatIDid={["One", "Two", "Three"]} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

it("renders an empty list when whatIDid is empty", () => {
  render(<WhatIDid whatIDid={[]} />);
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
});
