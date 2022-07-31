import React from "react";
import Menu from "../icons/Menu";
import Logo from "./Logo";

import classNames from "classnames";
import useScrollTrigger from "hooks/useScrollTrigger";
import { NavLink } from "../nav/NavLink";
import Overlay from "../layout/Overlay";
import NavDrawer from "../nav/NavDrawer";

type Props = {
  currentPathName: string;
};

const Header = ({ currentPathName }: Props) => {
  const [isOpen, setisOpen] = React.useState(false);
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
      <div
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
      </div>
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
