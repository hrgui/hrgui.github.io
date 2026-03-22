import type { JSX } from "preact";
import classNames from "classnames";

interface Props extends Omit<JSX.HTMLAttributes<SVGSVGElement>, "crossOrigin"> {
  className?: string;
}

const Next = ({ className: inputtedClassName, ...props }: Props) => {
  const className = classNames(`w-4 h-4 sm:w-5 sm:h-5`, inputtedClassName);

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      ></path>
    </svg>
  );
};

export default Next;
