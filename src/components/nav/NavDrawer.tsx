import type { JSX } from "preact";
import { cloneElement } from "preact";

import Logo from "~/components/app/Logo";

import Drawer from "../layout/Drawer";
import ThemeToggle from "../app/ThemeToggle";

type Props = {
  links: JSX.Element[];
  isOpen?: boolean;
  onLinkClicked?: () => void;
} & JSX.HTMLAttributes<HTMLElement>;

const NavDrawer = ({ isOpen = false, links, onLinkClicked }: Props) => {
  return (
    <Drawer className="sm:hidden" isOpen={isOpen}>
      <Logo className="flex items-center pl-5 h-16 border-b-2 border-gray-700 mb-2" />
      {links.map((link) => cloneElement(link, { onClick: onLinkClicked }))}
      <ThemeToggle variant="drawer" />
    </Drawer>
  );
};

export default NavDrawer;
