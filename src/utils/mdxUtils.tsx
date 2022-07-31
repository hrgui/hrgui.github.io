import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
export type PostFrontmatter = {
  title?: string;
  date?: string;
  excerpt?: string;
  slug: string;
  hidden?: boolean;
};
export type Frontmatter = PostFrontmatter;
