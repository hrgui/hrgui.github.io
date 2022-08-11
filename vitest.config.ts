/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.tsx",
    coverage: {
      reporter: ["text", "text-summary", "html"],
    },
  },
});
