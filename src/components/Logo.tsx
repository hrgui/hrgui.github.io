import React from "react"
import classNames from "classnames"
import Link from "next/link"

interface Props {
  className?: string
}

const Logo = ({ className }: Props) => {
  return (
    <Link href="/">
      <a>
        <div
          className={classNames(
            "text-3xl tracking-tight font-medium",
            className
          )}
        >
          hr<span className="text-red-700">gui</span>
        </div>
      </a>
    </Link>
  )
}

export default Logo
