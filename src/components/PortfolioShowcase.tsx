import React from "react"
import Link from "next/link"

const PortfolioShowcase = ({ items, hasTitle = true }) => {
  return (
    <div className="p-5 bg-yellow-700 bg-opacity-10">
      {hasTitle && <h1 className="text-3xl font-medium">Portfolio</h1>}

      <div className="pt-2 pb-2 sm:grid sm:grid-cols-3 sm:gap-6">
        {items.map((item, i) => {
          return (
            <Link href={`/portfolio/${item.slug}`} key={i}>
              <a className="text-gray-700 hover:text-gray-900 transition-all">
                <div
                  className="pl-2 pr-2 pb-4 bg-white bg-no-repeat bg-cover bg-center rounded-lg flex items-center justify-center h-52 hover:shadow-md"
                  title={item.title}
                  style={{
                    backgroundImage: `url(${item.thumbnail})`,
                  }}
                ></div>

                <h2 className="pb-4 tracking-tight font-medium">
                  {item.title}
                </h2>
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default PortfolioShowcase
