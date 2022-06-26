import { screen, render, within } from "@testing-library/react"
import { test, vi } from "vitest"
import HomePage from "./HomePage"

test("should render HomePage without crashing", () => {
  render(<HomePage portfolioItems={[]} />)
})
