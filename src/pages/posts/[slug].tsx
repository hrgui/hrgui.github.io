import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import { getMarkdownPropsBySlugName, getMarkdownStaticPaths } from "../../utils/mdxUtils";

const components = {
  Head,
};

export default function PostPage({ source, frontMatter }) {
  return (
    <div className="pt-28 p-6 container mx-auto">
      <div className="mb-14">
        <h5 className="text-gray-500 mb-4 font-mono leading-5">{frontMatter.date}</h5>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium">{frontMatter.title}</h1>
      </div>
      <div className="prose prose-md md:prose-lg lg:prose-xl">
        <main>
          <MDXRemote {...source} components={components} />
        </main>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ params }) =>
  getMarkdownPropsBySlugName(params.slug, "posts");

export const getStaticPaths = async () => getMarkdownStaticPaths("posts");
