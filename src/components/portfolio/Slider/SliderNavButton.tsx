import ctl from "@netlify/classnames-template-literals";
import classNames from "classnames";
import { JSX } from "preact";
import { twMerge } from "tailwind-merge";

type Props = JSX.HTMLAttributes<HTMLButtonElement>;

const SliderNavButton = ({
  className: inputtedClassName,
  children,
  ...props
}: Props) => {
  const className = twMerge(
    classNames(
      ctl(`
      text-gray-500 dark:text-gray-300 bg-black/70 hover:bg-black transition-all p-2 sm:p-3 absolute top-[40%] lg:top-[45%]
  `),
      inputtedClassName as string
    )
  );

  return (
    <button className={className} {...props}>
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        {children}
      </span>
    </button>
  );
};

export default SliderNavButton;
