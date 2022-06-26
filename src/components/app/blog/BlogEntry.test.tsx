import { render, screen } from "@testing-library/react"
import { toMdx } from "utils/mdxUtils"
import { test } from "vitest"
import BlogEntry from "./BlogEntry"

test("should be able to render no posts without crashing", async () => {
  const source = await toMdx("This is a sample blog post.")
  render(<BlogEntry source={source} />)
  expect(screen.getByText(/This is a sample blog post/)).toBeInTheDocument()
})
