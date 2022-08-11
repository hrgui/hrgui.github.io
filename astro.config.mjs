import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      "remark-gfm",
      "remark-smartypants",
      [
        "remark-mermaid",
        {
          simple: true,
        },
      ],
    ],
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
