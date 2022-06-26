import React from "react"
import HomePage from "@/components/app/HomePage"
import { getMarkdownSortedFiles } from "utils/mdxUtils"
import Seo from "@/components/app/Seo"

interface Props {
  portfolioItems
}

const IndexPage = (props: Props) => {
  return (
    <>
      <Seo description="Hi! I'm Harman. I am a developer who loves to make cool and awesome web applications that rock the world." />
      <HomePage portfolioItems={props.portfolioItems} />
    </>
  )
}

export async function getStaticProps() {
  const portfolioItems = await getMarkdownSortedFiles("portfolio")

  return {
    props: { portfolioItems },
  }
}

export default IndexPage
