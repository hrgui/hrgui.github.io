import React from "react"
import Link from "next/link"

interface PortfolioItem {
  title: string
  thumbnail: string
  slug: string
}

interface Props {
  items: PortfolioItem[]
  hasTitle?: boolean
}

const PortfolioShowcase = ({ items, hasTitle = true }: Props) => {
  return (
    <div className="p-6 bg-yellow-700 bg-opacity-10 dark:bg-neutral-800 dark:text-gray-200">
      {hasTitle && (
        <h1 className="text-3xl font-medium mb-8 mt-3">Portfolio</h1>
      )}

      <div className="pt-2 pb-2 sm:grid sm:grid-cols-3 sm:gap-6">
        {items.map((item, i) => {
          return (
            <Link href={`/portfolio/${item.slug}`} key={i}>
              <a className=" text-gray-200 hover:text-gray-100 transition-all z-0">
                <div
                  className="pl-2 pr-2 mb-6 bg-white bg-no-repeat bg-cover bg-center rounded-lg flex items-center justify-center h-52 hover:shadow-md relative"
                  title={item.title}
                  style={{
                    backgroundImage: `url(${item.thumbnail})`,
                  }}
                >
                  <h2 className="p-4 bg-black inline-flex rounded-bl-lg  bg-opacity-75 tracking-tight font-semibold text-xl absolute bottom-0 left-0 hover:bg-opacity-100 transition-all">
                    {item.title}
                  </h2>
                </div>
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default PortfolioShowcase
