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
    <Drawer className="sm:hidden graph-bg" isOpen={isOpen}>
      {/* Top corner glow */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      {/* Logo header */}
      <div className="relative flex items-center pl-5 h-16">
        <Logo />
        {/* bottom separator with glow */}
        <span className="pointer-events-none absolute inset-x-4 bottom-0 h-px rounded-full bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
        <span className="pointer-events-none absolute inset-x-8 bottom-0 h-3 blur-md bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Nav links */}
      <nav className="mt-2">
        {links.map((link) => cloneElement(link, { onClick: onLinkClicked }))}
      </nav>

      {/* Footer */}
      <div className="relative mt-2">
        <span className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
        <ThemeToggle variant="drawer" />
      </div>
    </Drawer>
  );
};

export default NavDrawer;
