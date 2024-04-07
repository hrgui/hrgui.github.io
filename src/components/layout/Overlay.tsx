import classNames from "classnames";
import { JSX } from "preact";
import { twMerge } from "tailwind-merge";

type Props = JSX.HTMLAttributes<HTMLDivElement>;

const Overlay = ({ className, ...props }: Props) => {
  return (
    <div
      className={twMerge(
        classNames("z-10 fixed inset-0 transition-opacity", className as string)
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default Overlay;
