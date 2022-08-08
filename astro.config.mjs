import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      "remark-gfm",
      "remark-smartypants",
      ["remark-mermaid", { simple: true }],
    ],
  },
  integrations: [
    react(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
});
