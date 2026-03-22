import type { JSX } from "preact";
import classNames from "classnames";

import { linkClassName } from "~/theme";

type Props = JSX.HTMLAttributes<HTMLButtonElement> & { href?: string };

const LinkButton = ({ className: inputtedClassName, ...props }: Props) => {
  return (
    <button
      className={classNames(linkClassName, inputtedClassName as string)}
      {...props}
    />
  );
};

export default LinkButton;
