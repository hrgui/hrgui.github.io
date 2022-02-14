import Seo from "@/components/Seo"
import { MDXRemote } from "next-mdx-remote"
import Head from "next/head"
import {
  getMarkdownPropsBySlugName,
  getMarkdownStaticPaths,
} from "../../utils/mdxUtils"

const components = {
  Head,
}

export default function PostPage({ source, frontMatter }) {
  return (
    <>
      <Seo title={`${frontMatter.title}`} description={frontMatter.excerpt} />
      <div className="pt-28 p-6 pb-0 container mx-auto max-w-none circuit-board-bg dark:dark-circuit-board-bg">
        <div className="mb-14">
          <h5 className="text-gray-500 mb-4 font-mono leading-5">
            {frontMatter.date}
          </h5>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
            {frontMatter.title}
          </h1>
        </div>
      </div>

      <div className="pl-6 pr-6">
        <div className="prose dark:prose-invert prose-md md:prose-lg lg:prose-xl max-w-none">
          <main>
            <MDXRemote {...source} components={components} />
          </main>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ params }) =>
  getMarkdownPropsBySlugName(params.slug, "posts")

export const getStaticPaths = async () => getMarkdownStaticPaths("posts")
