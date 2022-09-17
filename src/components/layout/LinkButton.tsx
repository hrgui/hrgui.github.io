import type { JSX } from "preact";
import { twMerge } from "tailwind-merge";

import { linkClassName } from "~/theme";

type Props = {} & JSX.HTMLAttributes<HTMLButtonElement>;

const LinkButton = ({ className: inputtedClassName, ...props }: Props) => {
  return (
    <button className={twMerge(linkClassName, inputtedClassName)} {...props} />
  );
};

export default LinkButton;
