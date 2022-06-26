import Slider from "@/components/portfolio/Slider"
import TechnologiesUsed from "@/components/portfolio/TechnologiesUsed"
import Seo from "@/components/app/Seo"
import { MDXRemote } from "next-mdx-remote"
import Head from "next/head"
import {
  getMarkdownPropsBySlugName,
  getMarkdownStaticPaths,
  PortfolioFrontmatter,
} from "../../utils/mdxUtils"
import PortfolioEntry from "@/components/portfolio/PortfolioEntry"

const components = {
  Head,
}

interface PortfolioPageProps {
  source
  frontMatter: PortfolioFrontmatter
}

export default function PortfolioPage({
  source,
  frontMatter: data,
}: PortfolioPageProps) {
  return (
    <>
      <Seo
        title={`Portfolio: ${data.title}`}
        description={data.whatIDid?.[0] || "Portfolio"}
      />
      <PortfolioEntry {...data} source={source} />
    </>
  )
}

export const getStaticProps = async ({ params }) =>
  getMarkdownPropsBySlugName(params.slug, "portfolio")

export const getStaticPaths = async () => getMarkdownStaticPaths("portfolio")
