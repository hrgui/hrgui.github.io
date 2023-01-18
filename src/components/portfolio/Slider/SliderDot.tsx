import ctl from "@netlify/classnames-template-literals";
import classNames from "classnames";
import { JSX } from "preact";
import { twMerge } from "tailwind-merge";

type Props = { active?: boolean } & JSX.HTMLAttributes<HTMLButtonElement>;

const SliderDot = ({
  className: inputtedClassName,
  active,
  ...props
}: Props) => {
  const className = twMerge(
    classNames(
      ctl(`
      w-3 
      h-3 
      rounded-full 
      bg-gray-500/50 
      dark:bg-gray-800/50 
      hover:bg-gray-500 
      dark:hover:bg-gray-800 
      transition-all
  `),
      { [`bg-gray-500 dark:bg-gray-800`]: active },
      inputtedClassName as string
    )
  );

  return <button className={className} {...props} />;
};

export default SliderDot;
