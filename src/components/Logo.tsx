import React from "react"
import classNames from "classnames"

interface Props {
  className?: string
}

const Logo = ({ className }: Props) => {
  return (
    <div
      className={classNames("text-3xl tracking-tight font-medium", className)}
    >
      hr<span className="text-red-700">gui</span>
    </div>
  )
}

export default Logo
