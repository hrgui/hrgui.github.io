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
    <Drawer className="sm:hidden shadow-overlay" isOpen={isOpen}>
      {/* Logo header */}
      <div className="flex h-16 items-center border-b border-b-solid border-grid-line pl-6">
        <Logo />
      </div>

      {/* Nav links */}
      <nav className="mt-2">
        {links.map((link) => cloneElement(link, { onClick: onLinkClicked }))}
      </nav>

      {/* Footer */}
      <div className="mt-2 border-t border-t-solid border-grid-line">
        <ThemeToggle variant="drawer" />
      </div>
    </Drawer>
  );
};

export default NavDrawer;
