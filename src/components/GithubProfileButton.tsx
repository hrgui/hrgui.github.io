import React from "react"
import cx from "classnames"

interface Props extends React.HTMLProps<HTMLAnchorElement> {}

const GithubProfileButton = ({ className, ...props }: Props) => {
  return (
    <a
      {...props}
      className={cx(
        "bg-red-700 text-white p-3 w-auto rounded-lg hover:bg-red-900 focus:outline-none focus:ring shadow-md hover:shadow-none transition-all duration-300 mt-7 sm:mt-5",
        className
      )}
    />
  )
}

export default GithubProfileButton
