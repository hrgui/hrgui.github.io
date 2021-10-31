import React from "react"
import Menu from "./icons/Menu"
import Logo from "./Logo"
import Link from "next/link"
import { useRouter } from "next/router"
import classNames from "classnames"

const NavLink = ({
  href,
  children,
  exact,
}: {
  href: string
  children: string
  exact?: boolean
}) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <a
        className={classNames(
          "text-gray-700 hover:text-gray-900 font-medium flex justify-center items-center pl-6 pr-6 h-16 hover:bg-red-700 hover:bg-opacity-5",
          {
            "text-red-700 hover:text-red-900 border-b-2 border-red-700": exact
              ? router.pathname === href
              : router.pathname.includes(href),
          }
        )}
      >
        {children}
      </a>
    </Link>
  )
}

const Header = () => {
  const router = useRouter()

  return (
    <div className="flex fixed items-center h-16 border-b border-gray-300 sm:justify-between w-full">
      <Menu className="sm:hidden w-16" />
      <Logo className="sm:pl-5" />
      <nav className="hidden sm:flex h-16 justify-center items-center">
        <NavLink href="/" exact>
          Home
        </NavLink>
        <NavLink href="/posts">Blog</NavLink>
        <NavLink href="/portfolio">Portfolio</NavLink>
      </nav>
    </div>
  )
}

export default Header
