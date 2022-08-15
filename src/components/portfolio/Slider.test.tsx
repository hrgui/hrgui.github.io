import { render, screen } from "@testing-library/preact";
import { it, describe } from "vitest";
import Slider from "./Slider";
import userEvent from "@testing-library/user-event";

it("should render normally without crashing - base case", () => {
  render(
    <Slider>
      <div>
        <a href="a.jpg" data-testid="a">
          <img src="a.jpg" />
        </a>
      </div>
      <div>
        <a href="b.jpg" data-testid="b">
          <img src="b.jpg" />
        </a>
      </div>
      <div>
        <a href="c.jpg" data-testid="c">
          <img src="c.jpg" />
        </a>
      </div>
      <div>
        <a href="d.jpg" data-testid="d">
          <img src="d.jpg" />
        </a>
      </div>
    </Slider>
  );
  expect(screen.getByLabelText(`Navigate to Item 1`)).toBeInTheDocument();
  expect(screen.getByLabelText(`Navigate to Item 2`)).toBeInTheDocument();
  expect(screen.getByLabelText(`Navigate to Item 3`)).toBeInTheDocument();
  expect(screen.getByLabelText(`Navigate to Item 4`)).toBeInTheDocument();
});

describe("navigation by buttons", () => {
  it.skip("should be able to click to the next item, which doesn't wrap", async () => {
    render(
      <Slider>
        <div>
          <a href="a.jpg" data-testid="a">
            <img src="a.jpg" />
          </a>
        </div>
        <div>
          <a href="b.jpg" data-testid="b">
            <img src="b.jpg" />
          </a>
        </div>
        <div>
          <a href="c.jpg" data-testid="c">
            <img src="c.jpg" />
          </a>
        </div>
        <div>
          <a href="d.jpg" data-testid="d">
            <img src="d.jpg" />
          </a>
        </div>
      </Slider>
    );
    expect(screen.getByLabelText(`Navigate to Item 1`)).toBeInTheDocument();

    const itemToClick = screen.getByLabelText(`Navigate to Item 2`);

    expect(itemToClick).toBeInTheDocument();

    await userEvent.click(itemToClick);
  });
});
