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
        "font-medium flex sm:justify-center items-center pl-6 pr-6 h-16 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-inset",
        isActive
          ? "text-primary hover:text-primary bg-surface-container-high border-l-2 border-primary sm:border-l-0 sm:border-t-2 sm:border-t-solid sm:rounded-none sm:bg-transparent sm:border-primary"
          : "text-on-surface hover:text-on-surface hover:bg-surface-container-high active:bg-surface-container"
      )}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
};
