import React from "react"
import Drawer from "../layout/Drawer"
import Logo from "@/components/app/Logo"

type Props = {
  links: JSX.Element[]
  isOpen?: boolean
  onLinkClicked?: () => void
} & React.HTMLProps<HTMLElement>

const NavDrawer = ({ isOpen = false, links, onLinkClicked }: Props) => {
  return (
    <Drawer isOpen={isOpen}>
      <Logo className="flex items-center pl-5 h-16 border-b-2 border-gray-700 mb-2" />
      {links.map(link => React.cloneElement(link, { onClick: onLinkClicked }))}
    </Drawer>
  )
}

export default NavDrawer
