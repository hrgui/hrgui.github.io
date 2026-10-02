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
        "relative flex h-16 items-center px-6 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset sm:h-9 sm:rounded-md sm:px-3",
        isActive
          ? "text-fg bg-surface-overlay sm:bg-transparent"
          : "text-fg-muted hover:text-fg hover:bg-surface-overlay"
      )}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && (
        <>
          {/* desktop: accent underline */}
          <span
            className="pointer-events-none absolute inset-x-3 -bottom-[14px] hidden h-0.5 rounded-full bg-accent sm:block"
            aria-hidden="true"
          />
          {/* mobile: accent edge */}
          <span
            className="pointer-events-none absolute inset-y-3 left-0 w-0.5 rounded-full bg-accent sm:hidden"
            aria-hidden="true"
          />
        </>
      )}
      {children}
    </a>
  );
};
