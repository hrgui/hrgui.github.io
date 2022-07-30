import BlogEntry from "@/components/app/blog/BlogEntry"
import BlogSubHeader from "@/components/app/blog/BlogSubHeader"
import Seo from "@/components/app/Seo"
import {
  Frontmatter,
  getMarkdownPropsBySlugName,
  getMarkdownStaticPaths,
} from "../../utils/mdxUtils"

export default function PostPage({
  source,
  frontMatter,
}: {
  source: any
  frontMatter: Frontmatter
}) {
  if (frontMatter.hidden && process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <>
      <Seo title={`${frontMatter.title}`} description={frontMatter.excerpt} />
      <BlogSubHeader
        date={frontMatter.date}
        title={frontMatter.title}
        hidden={frontMatter.hidden}
      />

      <BlogEntry source={source} />
    </>
  )
}

export const getStaticProps = async ({ params }) =>
  getMarkdownPropsBySlugName(params.slug, "posts")

export const getStaticPaths = async () => getMarkdownStaticPaths("posts")
