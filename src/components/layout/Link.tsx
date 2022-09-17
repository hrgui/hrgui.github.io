import type { JSX } from "preact";
import { twMerge } from "tailwind-merge";

type Props = {} & JSX.HTMLAttributes<HTMLAnchorElement>;

const Link = ({ className: inputtedClassName, ...props }: Props) => {
  return (
    <a
      className={twMerge(
        "text-red-700 dark:text-red-400 hover:underline font-medium",
        inputtedClassName
      )}
      {...props}
    />
  );
};

export default Link;
