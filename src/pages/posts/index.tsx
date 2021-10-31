import React from "react";
import { Frontmatter, getMarkdownSortedFiles } from "utils/mdxUtils";
import Link from "next/link";

interface Props {
  posts: Frontmatter[];
}

const PostsIndexPage = ({ posts }: Props) => {
  return (
    <div className="pt-20 p-5">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium mb-10 mt-6">Blog</h1>
      {posts.map((post) => {
        return (
          <div key={post.slug} className="pb-16">
            <Link href={`/posts/${post.slug}`}>
              <a>
                <h3 className="text-gray-500">{post.date}</h3>
                <h2 className="text-2xl sm:text-3xl mb-2 font-medium">{post.title}</h2>
              </a>
            </Link>
            <p className="prose">
              {post.excerpt}
              <br />
              <br />
              <Link href={`/posts/${post.slug}`}>
                <a className="block">Read More</a>
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PostsIndexPage;

export async function getStaticProps() {
  const posts = await getMarkdownSortedFiles("posts");

  return {
    props: {
      posts,
    },
  };
}
