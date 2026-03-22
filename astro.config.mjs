import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import unoCss from "@unocss/astro";
import tsconfigPaths from "vite-tsconfig-paths";
import remarkMermaid from "./utils/remark-mermaid/index.mjs";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tsconfigPaths()],
  },
  markdown: {
    remarkPlugins: ["remark-gfm", "remark-smartypants", remarkMermaid],
  },
  integrations: [unoCss(), preact()],
});
