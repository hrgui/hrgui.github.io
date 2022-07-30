import React from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

type Props = {
  href: string;
  children?: string;
  exact?: boolean;
  onClick?: () => void;
};

export const NavLink = ({ href, children, exact, onClick }: Props) => {
  // TODO
  const isActive = false;

  return (
    <a
      href={href}
      className={twMerge(
        classNames(
          "text-gray-700 dark:text-gray-200 hover:text-gray-900  dark:hover:text-gray-100 transition-colors font-medium flex sm:justify-center items-center pl-6 pr-6 h-16 hover:bg-red-700 hover:bg-opacity-10",
          {
            "text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-500  bg-red-700 bg-opacity-10  border-l-2 sm:border-l-0 sm:rounded-none sm:bg-transparent sm:border-t-2 border-red-700": isActive,
          }
        )
      )}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
};
