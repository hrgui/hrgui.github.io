import classNames from "classnames";
import { useState } from "preact/hooks";
import { useTranslation } from "~/i18n/context";

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
  const { t } = useTranslation();
  const [isOpen, setisOpen] = useState(false);
  const handleSetIsOpen = () => setisOpen(!isOpen);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  // NOTE: this needs a key because of use in the Drawer
  const links = [
    <NavLink currentPathName={currentPathName} key="home" href="/" exact>
      {t("nav.home")}
    </NavLink>,
    <NavLink currentPathName={currentPathName} key="blog" href="/posts">
      {t("nav.blog")}
    </NavLink>,
    <NavLink
      currentPathName={currentPathName}
      key="portfolio"
      href="/portfolio"
    >
      {t("nav.portfolio")}
    </NavLink>,
  ];

  return (
    <>
      <header
        className={classNames(
          "fixed z-40 flex h-16 w-full items-center gap-3 border-b border-b-solid px-4 transition-colors duration-200 sm:justify-between sm:px-6",
          trigger
            ? "border-grid-line bg-canvas/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <button
          onClick={handleSetIsOpen}
          aria-label="Open navigation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-solid border-border-control text-fg transition-colors duration-150 ease-out hover:bg-surface-overlay hr-focus-ring sm:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Logo />
        <nav
          className="hidden h-16 items-center sm:flex"
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
