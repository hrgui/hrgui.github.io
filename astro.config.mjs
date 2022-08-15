import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import remarkMermaid from "./utils/remark-mermaid/index.mjs";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: ["remark-gfm", "remark-smartypants", remarkMermaid],
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    preact(),
  ],
});
