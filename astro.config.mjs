import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import unoCss from "@unocss/astro";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import tsconfigPaths from "vite-tsconfig-paths";
import remarkMermaid from "./utils/remark-mermaid/index.mjs";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tsconfigPaths()],
  },
  markdown: {
    remarkPlugins: [remarkGfm, remarkSmartypants, remarkMermaid],
  },
  integrations: [mdx(), unoCss(), preact()],
});
