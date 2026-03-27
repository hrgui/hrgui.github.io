import classNames from "classnames";
import { useState } from "preact/hooks";

import useScrollTrigger from "~/hooks/useScrollTrigger";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

import Menu from "../icons/Menu";
import Overlay from "../layout/Overlay";
import NavDrawer from "../nav/NavDrawer";
import { NavLink } from "../nav/NavLink";

type Props = {
  currentPathName: string;
};

const Header = ({ currentPathName }: Props) => {
  const [isOpen, setisOpen] = useState(false);
  const handleSetIsOpen = () => setisOpen(!isOpen);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  // NOTE: this needs a key because of use in the Drawer
  const links = [
    <NavLink currentPathName={currentPathName} key="home" href="/" exact>
      Home
    </NavLink>,
    <NavLink currentPathName={currentPathName} key="blog" href="/posts">
      Blog
    </NavLink>,
    <NavLink
      currentPathName={currentPathName}
      key="portfolio"
      href="/portfolio"
    >
      Portfolio
    </NavLink>,
  ];

  return (
    <>
      <header
        className={classNames(
          "flex fixed items-center h-16 border-gray-300 sm:justify-between w-full transition-colors z-40",
          {
            "bg-white dark:bg-zinc-900  dark:border-gray-700": trigger,
          }
        )}
      >
        <button
          onClick={handleSetIsOpen}
          className="sm:hidden p-2 opacity-75 rounded border border-outline-variant/60 text-on-surface transition-all duration-150 ease-out hover:opacity-100 hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
        >
          <Menu className="sm:hidden w-12 h-6" />
        </button>
        <Logo className="sm:pl-5" />
        <nav
          className="hidden sm:flex h-16 justify-center items-center"
          data-testid="desktop-nav"
        >
          {links}
          <ThemeToggle />
        </nav>
      </header>
      <Overlay
        onClick={handleSetIsOpen}
        className={classNames({
          hidden: !isOpen,
        })}
      />
      <NavDrawer isOpen={isOpen} links={links} />
    </>
  );
};

export default Header;
