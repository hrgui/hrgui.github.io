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
  onClick,
}: {
  href: string
  children: string
  exact?: boolean
  onClick?: () => void
}) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <a
        className={classNames(
          "text-gray-700 hover:text-gray-900 font-medium flex sm:justify-center items-center pl-6 pr-6 h-16 hover:bg-red-700 hover:bg-opacity-5",
          {
            "text-red-700 hover:text-red-900  bg-red-200 rounded-r-full sm:rounded-none sm:bg-transparent sm:border-b-2 border-red-700": exact
              ? router.pathname === href
              : router.pathname.includes(href),
          }
        )}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  )
}

const Header = () => {
  const [isOpen, setisOpen] = React.useState(false)
  const handleSetIsOpen = () => setisOpen(!isOpen)

  const links = [
    <NavLink key="home" href="/" exact>
      Home
    </NavLink>,
    <NavLink key="blog" href="/posts">
      Blog
    </NavLink>,
    <NavLink key="portfolio" href="/portfolio">
      Portfolio
    </NavLink>,
  ]

  return (
    <>
      <div className="flex fixed items-center h-16 border-b border-gray-300 sm:justify-between w-full">
        <Menu onClick={handleSetIsOpen} className="sm:hidden w-16" />
        <Logo className="sm:pl-5" />
        <nav className="hidden sm:flex h-16 justify-center items-center">
          {links}
        </nav>
      </div>
      <div
        onClick={handleSetIsOpen}
        className={classNames("z-10 fixed inset-0 transition-opacity", {
          hidden: !isOpen,
        })}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <aside
        className={classNames(
          "transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          }
        )}
      >
        <Logo className="flex items-center pl-5 h-16 border-b-2 mb-2" />
        {links.map(link =>
          React.cloneElement(link, { onClick: handleSetIsOpen })
        )}
      </aside>
    </>
  )
}

export default Header
