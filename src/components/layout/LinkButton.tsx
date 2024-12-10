import type { JSX } from "preact";
import { twMerge } from "tailwind-merge";

import { linkClassName } from "~/theme";

type Props = JSX.HTMLAttributes<HTMLButtonElement> & { href?: string };

const LinkButton = ({ className: inputtedClassName, ...props }: Props) => {
  return (
    <button
      className={twMerge(linkClassName, inputtedClassName as string)}
      {...props}
    />
  );
};

export default LinkButton;
