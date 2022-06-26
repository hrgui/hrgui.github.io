import React from "react"
import Head from "next/head"
import { MDXRemote } from "next-mdx-remote"

type Props = {
  source: any
}

const components = {
  Head,
}

const BlogEntry = ({ source }: Props) => {
  return (
    <div className="pl-6 pr-6">
      <div className="prose dark:prose-invert prose-md lg:prose-lg max-w-[1536px] mx-auto">
        <main>
          <MDXRemote {...source} components={components} />
        </main>
      </div>
    </div>
  )
}

export default BlogEntry
