import { render, screen } from "@testing-library/react"
import { toMdx } from "utils/mdxUtils"
import { vi, test } from "vitest"
import PortfolioEntry from "./PortfolioEntry"

test("should render a basic portfolio entry with thumbnail and images without crashing", async () => {
  const source = await toMdx("portfolio text.")
  render(
    <PortfolioEntry
      source={source}
      title="Title"
      url="https://www.harmanradix.com"
      githubUrl="https://www.harmanradix.com"
      urls={["https://www.harmanradix.com"]}
      whatIDid={["whatidid1", "whatidid2", "whatidid3"]}
      thumbnail={"test.jpg"}
      images={[
        { src: "test.jpg", thumbnail: "test.jpg" },
        { src: "test1.jpg", thumbnail: "test1.jpg" },
        { src: "test2.jpg", thumbnail: "test2.jpg" },
      ]}
      iframe={{ src: "https://www.harmanradix.com" }}
      technologiesUsed={[
        { type: "CSS", value: 91.3 },
        { type: "HTML", value: 8.7 },
      ]}
    />
  )
  expect(screen.getByText("Title")).toBeInTheDocument()
  expect(screen.getByText("Open Link / Demo in new Tab")).toBeInTheDocument()
  expect(screen.getByText("View Github Code")).toBeInTheDocument()
  expect(
    screen.getByText("Visit https://www.harmanradix.com")
  ).toBeInTheDocument()
  expect(screen.getByText("What I Did")).toBeInTheDocument()
  expect(screen.getByText("Technologies Used")).toBeInTheDocument()
  expect(screen.getByText("whatidid1")).toBeInTheDocument()
  expect(screen.getByTestId("portfolio-media-iframe")).toBeInTheDocument()
  expect(screen.getByTestId("portfolio-media-slider")).toBeInTheDocument()
})

test("should render a basic portfolio entry with thumbnail without crashing", async () => {
  const source = await toMdx("portfolio text.")
  render(
    <PortfolioEntry
      source={source}
      title="Title"
      url="https://www.harmanradix.com"
      whatIDid={["whatidid1", "whatidid2", "whatidid3"]}
      thumbnail={"test.jpg"}
    />
  )
  expect(screen.getByText("Title")).toBeInTheDocument()
  expect(screen.getByText("Open Link / Demo in new Tab")).toBeInTheDocument()
  expect(screen.getByText("What I Did")).toBeInTheDocument()
  expect(screen.getByText("whatidid1")).toBeInTheDocument()
  expect(screen.getByTestId("portfolio-media-thumbnail")).toBeInTheDocument()
})