import { JSX } from "preact";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<JSX.HTMLAttributes<SVGSVGElement>, "crossOrigin"> {
  className?: string;
}

const Next = ({ className: inputtedClassName, ...props }: Props) => {
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
