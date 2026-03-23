import ctl from "@netlify/classnames-template-literals";
import classNames from "classnames";
import type { JSX } from "preact";

type Props = { active?: boolean } & JSX.HTMLAttributes<HTMLButtonElement>;

const SliderDot = ({
  className: inputtedClassName,
  active,
  ...props
}: Props) => {
  const className = classNames(
    ctl(`
      w-3 
      h-3 
      rounded-full 
      hover:bg-primary/70 
      transition-all
  `),
    {
      "bg-on-surface/30": !active,
      "bg-primary": active,
    },
    inputtedClassName as string
  );

  return <button className={className} {...props} />;
};

export default SliderDot;
