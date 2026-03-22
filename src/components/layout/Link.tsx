import type { JSX } from "preact";
import classNames from "classnames";

import { linkClassName } from "~/theme";

type Props = JSX.HTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  target?: string;
  rel?: string;
};

const Link = ({ className: inputtedClassName, ...props }: Props) => {
  return (
    <a
      className={classNames(linkClassName, inputtedClassName as string)}
      {...props}
    />
  );
};

export default Link;
