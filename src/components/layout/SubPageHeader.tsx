import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: React.ReactNode;
  bgClassName?: string;
  className?: string;
};

const SubPageHeader = ({ bgClassName, className, children }: Props) => {
  bgClassName = bgClassName || `circuit-board-bg dark:dark-circuit-board-bg`;
  return (
    <div
      className={twMerge("pt-16 pl-6 pr-6 pb-0 overflow-hidden", bgClassName)}
    >
      <h1
        className={twMerge(
          "text-5xl leading-tight sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight font-semibold tracking-tight mb-8 mt-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-red-500 to-orange-500",
          className
        )}
      >
        <div className="container mx-auto">{children}</div>
      </h1>
    </div>
  );
};

export default SubPageHeader;
