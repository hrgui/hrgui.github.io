import React from "react"
import HomePage from "@/components/HomePage"
import { getMarkdownSortedFiles } from "utils/mdxUtils"

interface Props {
  portfolioItems
}

const IndexPage = (props: Props) => {
  return <HomePage portfolioItems={props.portfolioItems} />
}

export async function getStaticProps() {
  const portfolioItems = await getMarkdownSortedFiles("portfolio")

  return {
    props: { portfolioItems },
  }
}

export default IndexPage
