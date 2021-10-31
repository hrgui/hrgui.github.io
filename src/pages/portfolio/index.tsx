import PortfolioShowcase from "@/components/PortfolioShowcase"
import React from "react"
import { getMarkdownSortedFiles } from "utils/mdxUtils"

interface Props {
  items
}

const PortfolioPage = (props: Props) => {
  return (
    <div className={"pt-16"}>
      <h1 className="text-5xl p-5 sm:text-6xl md:text-7xl font-medium mb-4 mt-6">
        Portfolio
      </h1>

      <PortfolioShowcase hasTitle={false} items={props.items} />
    </div>
  )
}

export async function getStaticProps() {
  const items = await getMarkdownSortedFiles("portfolio")

  return {
    props: { items },
  }
}

export default PortfolioPage
