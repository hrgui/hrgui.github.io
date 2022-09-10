import { JSX } from "preact";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<JSX.HTMLAttributes<SVGSVGElement>, "crossOrigin"> {
  className?: string;
}

const Prev = ({ className: inputtedClassName, ...props }: Props) => {
  const className = twMerge(
    `w-4 h-4 text-white sm:w-5 sm:h-5`,
    inputtedClassName
  );

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
        d="M15 19l-7-7 7-7"
      ></path>
    </svg>
  );
};

export default Prev;
