/// <reference types="vitest" />

import preact from "@preact/preset-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

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
