import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import { IframeHTMLAttributes } from "react";

export interface PortfolioTechnology {
  type?: string;
  value?: number;
}

interface PortfolioIframe extends React.HTMLProps<HTMLIFrameElement> {}

export type PortfolioFrontmatter = {
  date?: string;
  title?: string;
  category?: string;
  githubUrl?: string;
  images?: { src: string; thumbnail: string }[];
  url?: string;
  urls?: string[];
  thumbnail?: string;
  iframe?: PortfolioIframe;
  whatIDid?: string[];
  technologiesUsed?: PortfolioTechnology[];
};
export type PostFrontmatter = { title?: string; date?: string; excerpt?: string; slug: string };
export type Frontmatter = PostFrontmatter;

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), "src/posts");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const PORTFOLIO_PATH = path.join(process.cwd(), "src/portfolio");

export const portfolioFilePaths = fs
  .readdirSync(PORTFOLIO_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export async function getMarkdownPropsBySlugName(slugName, type: "posts" | "portfolio") {
  const filePaths = type === "posts" ? postFilePaths : portfolioFilePaths;
  const filename = filePaths.filter((path) => path.includes(slugName))[0];
  const fileDir = type === "posts" ? POSTS_PATH : PORTFOLIO_PATH;

  if (!filename) {
    return {
      notFound: true,
    };
  }

  const source = fs.readFileSync(path.join(fileDir, filename));

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}

export async function getMarkdownStaticPaths(type: "posts" | "portfolio") {
  const filePaths = type === "posts" ? postFilePaths : portfolioFilePaths;
  const paths = filePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getMarkdownSortedFiles(type: "posts" | "portfolio") {
  const filePaths = type === "posts" ? postFilePaths : portfolioFilePaths;
  const fileDir = type === "posts" ? POSTS_PATH : PORTFOLIO_PATH;

  const frontmatters: Frontmatter[] = [];
  for (const filename of filePaths) {
    const source = fs.readFileSync(path.join(fileDir, filename));
    const { data } = matter(source);

    frontmatters.push({ ...data, slug: filename.split(".")[0] });
  }

  if (type == "posts") {
    frontmatters.sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return bDate - aDate; // DESC
    });
  }

  return frontmatters;
}
