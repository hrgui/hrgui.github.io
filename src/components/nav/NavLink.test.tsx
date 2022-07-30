import { it, vi, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { NavLink } from "./NavLink"
import userEvent from "@testing-library/user-event"
import mockRouter from "next-router-mock"

vi.mock("next/dist/client/router", () => require("next-router-mock"))
vi.mock("next/router", () => require("next-router-mock"))

afterEach(() => {
  vi.restoreAllMocks()
})

//TODO: for some reason even though we mocked the 2 routers, it still complains and router = null
it("should render a link that accepts Text, and can accept an onClick", async () => {
  const handleClick = vi.fn()
  render(
    <NavLink href="test" onClick={handleClick}>
      Test
    </NavLink>
  )
  const link = screen.getByText(/Test/)
  expect(link).toBeInTheDocument()
  await userEvent.click(link)
  expect(handleClick).toHaveBeenCalled()
  expect(link.getAttribute("aria-current")).toMatchInlineSnapshot("null")
})

it("should be able to render current page link", async () => {
  //console.log(useRouter())
  mockRouter.setCurrentUrl("/test")
  const handleClick = vi.fn()
  render(
    <NavLink href="/test" onClick={handleClick}>
      Test
    </NavLink>
  )
  const link = screen.getByText(/Test/)
  expect(link).toBeInTheDocument()
  expect(link.getAttribute("aria-current")).toMatchInlineSnapshot('null')
})
