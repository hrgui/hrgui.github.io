import classNames from "classnames";
import type { JSX } from "preact";

type Props = {
  isOpen?: boolean;
} & JSX.HTMLAttributes<HTMLElement>;

const Drawer = ({ isOpen = false, children, className, ...props }: Props) => {
  return (
    <aside
      className={classNames(
        "sm:-translate-x-full transform top-0 left-0 w-72 bg-surface-container-low fixed h-full overflow-auto ease-in-out transition-all duration-300 z-60 border-r border-outline-variant/50",
        {
          "translate-x-0": isOpen,
          "-translate-x-full": !isOpen,
        },
        className as string
      )}
      {...props}
    >
      {children}
    </aside>
  );
};

export default Drawer;
