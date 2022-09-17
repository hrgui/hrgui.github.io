import type { JSX } from "preact";
import { twMerge } from "tailwind-merge";

type Props = {} & JSX.HTMLAttributes<HTMLButtonElement>;

const LinkButton = ({ className: inputtedClassName, ...props }: Props) => {
  return (
    <button
      className={twMerge(
        "text-red-700 dark:text-red-400 hover:underline font-medium",
        inputtedClassName
      )}
      {...props}
    />
  );
};

export default LinkButton;
