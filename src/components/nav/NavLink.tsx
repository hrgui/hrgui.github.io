import classNames from "classnames";

type Props = {
  href: string;
  children?: string;
  exact?: boolean;
  onClick?: () => void;
  currentPathName?: string;
};

export const NavLink = ({
  href,
  currentPathName = "",
  children,
  onClick,
  exact = false,
}: Props) => {
  const isActive = exact
    ? currentPathName === href
    : currentPathName.startsWith(href);

  return (
    <a
      href={href}
      className={classNames(
        "relative font-medium flex sm:justify-center items-center pl-6 pr-6 h-16 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-inset",
        isActive
          ? "text-primary hover:text-primary bg-surface-container-high/50 sm:rounded-none sm:bg-transparent"
          : "text-on-surface hover:text-on-surface hover:bg-surface-container-high/50 active:bg-surface-container"
      )}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && (
        <>
          {/* desktop: top glow */}
          <span className="pointer-events-none absolute inset-x-3 top-0 hidden h-px rounded-full bg-gradient-to-r from-transparent via-primary/85 to-transparent sm:block" />
          <span className="pointer-events-none absolute inset-x-5 top-0 hidden h-4 blur-md bg-gradient-to-r from-transparent via-primary/35 to-transparent sm:block" />
          {/* mobile: left glow */}
          <span className="pointer-events-none absolute left-0 inset-y-3 sm:hidden w-px rounded-full bg-gradient-to-b from-transparent via-primary/85 to-transparent" />
          <span className="pointer-events-none absolute left-0 inset-y-5 sm:hidden w-4 blur-md bg-gradient-to-b from-transparent via-primary/35 to-transparent" />
        </>
      )}
      {children}
    </a>
  );
};
