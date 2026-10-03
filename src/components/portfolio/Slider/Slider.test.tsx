import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { it, describe, vi, beforeEach, afterEach } from "vitest";

import Slider from "./Slider";

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

describe("scroll position", () => {
  const ITEM_WIDTH = 960;
  const CAROUSEL_LEFT = 240; // e.g. inside a centred article column

  let scrollTo: ReturnType<typeof vi.fn>;
  let originalScrollTo: typeof Element.prototype.scrollTo;
  let rectSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    originalScrollTo = Element.prototype.scrollTo;
    scrollTo = vi.fn();
    Element.prototype.scrollTo = scrollTo as never;

    rectSpy = vi
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockImplementation(function (this: Element) {
        const rect = (left: number, width: number) =>
          ({
            left,
            right: left + width,
            top: 0,
            bottom: 300,
            width,
            height: 300,
            x: left,
            y: 0,
            toJSON: () => ({}),
          }) as DOMRect;

        if (this.classList.contains("carousel")) {
          return rect(CAROUSEL_LEFT, ITEM_WIDTH);
        }
        if (this.classList.contains("carousel__item")) {
          // DOM order: [duplicate of last, 0, 1, ..., n-1, duplicate of first]
          const position = Array.from(this.parentElement!.children).indexOf(
            this
          );
          return rect(CAROUSEL_LEFT + position * ITEM_WIDTH, ITEM_WIDTH);
        }
        return rect(0, 0);
      });
  });

  afterEach(() => {
    Element.prototype.scrollTo = originalScrollTo;
    rectSpy.mockRestore();
  });

  it("scrolls one item when the carousel isn't at the viewport's left edge", async () => {
    render(
      <Slider isAutoPlay={false}>
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </Slider>
    );
    scrollTo.mockClear();

    await userEvent.click(screen.getByRole("button", { name: "Next" }));

    // Item 1 is the 3rd child (after the leading duplicate), so its scroll
    // offset inside the carousel is 2 * ITEM_WIDTH. Measuring against the
    // viewport instead would overshoot by CAROUSEL_LEFT.
    expect(scrollTo).toHaveBeenLastCalledWith(
      expect.objectContaining({ left: 2 * ITEM_WIDTH })
    );
  });
});
