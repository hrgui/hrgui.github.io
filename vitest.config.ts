/// <reference types="vitest" />

import preact from "@preact/preset-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import { GithubActionsReporter } from "vitest-github-actions-summary-reporter";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.tsx",
    reporters: [new GithubActionsReporter()],
    coverage: {
      reporter: ["text", "text-summary", "html"],
    },
  },
});
