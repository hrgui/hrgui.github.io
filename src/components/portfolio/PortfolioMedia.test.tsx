import { render, screen } from "@testing-library/preact";
import { vi } from "vitest";

vi.mock("~/components/portfolio/Slider/Slider", () => ({
  default: ({ children }: { children: preact.ComponentChildren }) => (
    <div data-testid="portfolio-media-slider">{children}</div>
  ),
}));

import PortfolioMedia from "./PortfolioMedia";

const images = [
  { src: "/images/a.jpg", thumbnail: "/images/a-thumb.jpg" },
  { src: "/images/b.jpg", thumbnail: "/images/b-thumb.jpg" },
];

it("renders a thumbnail when only thumbnail is provided", () => {
  render(<PortfolioMedia title="My Project" thumbnail="/images/thumb.jpg" />);
  expect(screen.getByTestId("portfolio-media-thumbnail")).toBeInTheDocument();
  expect(screen.getByAltText("My Project")).toBeInTheDocument();
});

it("does not render a thumbnail when images are also provided", () => {
  render(
    <PortfolioMedia
      title="My Project"
      thumbnail="/images/thumb.jpg"
      images={images}
    />
  );
  expect(
    screen.queryByTestId("portfolio-media-thumbnail")
  ).not.toBeInTheDocument();
});

it("renders a slider when images are provided", () => {
  render(<PortfolioMedia title="My Project" images={images} />);
  expect(screen.getByTestId("portfolio-media-slider")).toBeInTheDocument();
});

it("renders image links inside the slider", () => {
  render(<PortfolioMedia title="My Project" images={images} />);
  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(images.length);
  expect(links[0]).toHaveAttribute("href", images[0].src);
  expect(links[1]).toHaveAttribute("href", images[1].src);
});

it("renders iframe when iframe prop is provided", () => {
  render(
    <PortfolioMedia
      title="My Project"
      thumbnail="/images/thumb.jpg"
      iframe={{ src: "https://example.com" }}
    />
  );
  expect(screen.getByTestId("portfolio-media-iframe")).toBeInTheDocument();
  expect(
    screen.getByTestId("portfolio-media-iframe-thumbnail")
  ).toBeInTheDocument();
});

it("does not render thumbnail or slider when iframe is provided", () => {
  render(
    <PortfolioMedia
      title="My Project"
      thumbnail="/images/thumb.jpg"
      images={images}
      iframe={{ src: "https://example.com" }}
    />
  );
  expect(
    screen.queryByTestId("portfolio-media-thumbnail")
  ).not.toBeInTheDocument();
  expect(
    screen.queryByTestId("portfolio-media-slider")
  ).not.toBeInTheDocument();
});

it("renders nothing when no props are provided", () => {
  render(<PortfolioMedia title="My Project" />);
  expect(
    screen.queryByTestId("portfolio-media-thumbnail")
  ).not.toBeInTheDocument();
  expect(
    screen.queryByTestId("portfolio-media-slider")
  ).not.toBeInTheDocument();
  expect(
    screen.queryByTestId("portfolio-media-iframe")
  ).not.toBeInTheDocument();
});
