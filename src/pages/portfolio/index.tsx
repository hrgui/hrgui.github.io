import PortfolioShowcase from "@/components/app/portfolio/PortfolioShowcase"
import Seo from "@/components/app/Seo"
import SubPageHeader from "@/components/layout/SubPageHeader"
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
