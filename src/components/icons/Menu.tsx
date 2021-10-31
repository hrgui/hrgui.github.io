import React from "react"
import classnames from "classnames"

interface Props extends Omit<React.HTMLProps<SVGSVGElement>, "crossOrigin"> {
  className?: string
}

const Menu = ({ className, ...props }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classnames("h-6 w-6", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}

export default Menu
