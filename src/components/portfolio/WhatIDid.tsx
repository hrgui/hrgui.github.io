import React from "react"
import { PortfolioFrontmatter } from "utils/mdxUtils"

type Props = Pick<PortfolioFrontmatter, "whatIDid">

const WhatIDid = ({ whatIDid }: Props) => {
  return (
    <div className="mb-10 md:col-span-8">
      <h3 className="font-semibold text-2xl md:text-4xl mb-6 text-gray-700 dark:text-gray-200">
        What I Did
      </h3>
      <ul className="ml-6">
        {whatIDid.map((bullet, i) => (
          <li key={i} className="list-disc">
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WhatIDid
