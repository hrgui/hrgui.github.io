import PortfolioShowcase from "@/components/PortfolioShowcase"
import Seo from "@/components/Seo"
import React from "react"
import { getMarkdownSortedFiles } from "utils/mdxUtils"

interface Props {
  items
}

const PortfolioPage = (props: Props) => {
  return (
    <>
      <Seo
        title="Portfolio"
        description="View Harman's showcase of work as a developer."
      />
      <div className={"pt-16 graph-bg dark:dark-graph-bg"}>
        <h1 className="pl-5 text-5xl sm:text-6xl md:text-7xl md:leading-tight font-semibold tracking-tight mb-10 mt-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400  to-violet-500">
          Portfolio
        </h1>

        <PortfolioShowcase hasTitle={false} items={props.items} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const items = await getMarkdownSortedFiles("portfolio")

  return {
    props: { items },
  }
}

export default PortfolioPage
