import React from "react"
import { Frontmatter, getMarkdownSortedFiles } from "utils/mdxUtils"
import Link from "next/link"
import Seo from "@/components/app/Seo"
import SubPageHeader from "@/components/layout/SubPageHeader"
import classNames from "classnames"

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
      <div className="pl-6 pr-6 pt-6 sm:pl-0 sm:pr-0 container mx-auto">
        {posts.map(post => {
          if (post.hidden && process.env.NODE_ENV !== "development") {
            return null
          }

          return (
            <div key={post.slug} className="pb-16">
              <Link href={`/posts/${post.slug}`}>
                <a>
                  <h3 className="text-gray-500 font-mono">{post.date}</h3>
                  <h2
                    className={classNames(
                      "text-2xl sm:text-3xl mb-2 font-semibold",
                      {
                        italic: post.hidden,
                      }
                    )}
                  >
                    {post.title}{" "}
                    {post.hidden &&
                      process.env.NODE_ENV === "development" &&
                      `(hidden)`}
                  </h2>
                </a>
              </Link>
              <p className="prose dark:prose-invert max-w-none dark:text-gray-200">
                {post.excerpt}
                <br />
                <br />
                <Link href={`/posts/${post.slug}`}>
                  <a className="block">Read More</a>
                </Link>
              </p>
            </div>
          )
        })}
      </div>
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
