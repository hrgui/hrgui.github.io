import type { JSX } from "preact";
import { twMerge } from "tailwind-merge";

import { linkClassName } from "~/theme";

type Props = JSX.HTMLAttributes<HTMLAnchorElement>;

const Link = ({ className: inputtedClassName, ...props }: Props) => {
  return (
    <a
      className={twMerge(linkClassName, inputtedClassName as string)}
      {...props}
    />
  );
};

export default Link;
