import classNames from "classnames";
import { useState } from "preact/hooks";

import useScrollTrigger from "hooks/useScrollTrigger";

import Logo from "./Logo";

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
          "flex fixed items-center h-16 border-gray-300 sm:justify-between w-full transition-colors z-10",
          {
            "bg-white dark:bg-zinc-900  dark:border-gray-700": trigger,
          }
        )}
      >
        <button
          onClick={handleSetIsOpen}
          className="sm:hidden hover:bg-gray-800 hover:opacity-100 p-2 opacity-75 transition-all"
        >
          <Menu className="sm:hidden w-12 h-6" />
        </button>
        <Logo className="sm:pl-5" />
        <nav
          className="hidden sm:flex h-16 justify-center items-center"
          data-testid="desktop-nav"
        >
          {links}
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
