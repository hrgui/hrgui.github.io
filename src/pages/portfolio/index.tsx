import PortfolioShowcase from "@/components/PortfolioShowcase"
import Seo from "@/components/Seo"
import SubPageHeader from "@/components/SubPageHeader"
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
      <SubPageHeader
        bgClassName="graph-bg dark:dark-graph-bg"
        className="from-pink-400  to-violet-500"
      >
        Portfolio
      </SubPageHeader>
      <PortfolioShowcase hasTitle={false} items={props.items} />
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
