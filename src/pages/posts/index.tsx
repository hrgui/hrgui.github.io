import React from "react"
import { Frontmatter, getMarkdownSortedFiles } from "utils/mdxUtils"
import Link from "next/link"
import Seo from "@/components/app/Seo"
import SubPageHeader from "@/components/layout/SubPageHeader"
import classNames from "classnames"
import Posts from "@/components/app/blog/Posts"

interface Props {
  posts: Frontmatter[]
}

const PostsIndexPage = ({ posts }: Props) => {
  return (
    <>
      <Seo
        title="Blog"
        description="Read about Harman's blog posts about the web and things."
      />
      <SubPageHeader>Blog</SubPageHeader>
      <Posts posts={posts} />
    </>
  )
}

export default PostsIndexPage

export async function getStaticProps() {
  const posts = await getMarkdownSortedFiles("posts")

  return {
    props: {
      posts,
    },
  }
}
