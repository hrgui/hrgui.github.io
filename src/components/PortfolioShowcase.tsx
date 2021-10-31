import React from "react"
import Link from "next/link"

const PortfolioShowcase = ({ items, hasTitle = true }) => {
  return (
    <div className="p-5">
      {hasTitle && <h1 className="text-3xl font-medium">Portfolio</h1>}

      <div className="pt-2 pb-2 sm:grid sm:grid-cols-3 sm:gap-4">
        {items.map((item, i) => {
          return (
            <div key={i} className="pl-2 pr-2 pb-4">
              <Link href={`/portfolio/${item.slug}`}>
                <a>
                  <img src={item.thumbnail} alt={item.title} className="h-52" />
                  <h2 className="text-2xl pb-4 font-medium underline">
                    {item.title}
                  </h2>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PortfolioShowcase
