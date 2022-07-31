import { render, screen } from "@testing-library/react";
import { test } from "vitest";
import TechnicalSkills from "./TechnicalSkills";

test("should be able to render default TechnicalSkills", () => {
  render(<TechnicalSkills />);
  expect(screen.getByText(/JavaScript/)).toBeInTheDocument();
});

test("should be able to render TechnicalSkills more than 1 level", () => {
  render(
    <TechnicalSkills
      technicalSkills={[
        {
          key: "a",
          title: <>A</>,
          items: [
            {
              title: "AA",
              items: [
                {
                  title: "AAA",
                  items: ["AAAA"],
                },
              ],
            },
          ],
        },
      ]}
    />
  );
  expect(screen.getByText("AAAA")).toBeInTheDocument();
});
