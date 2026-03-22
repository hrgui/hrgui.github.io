/// <reference types="vitest" />

import { fileURLToPath } from "node:url";
import { defineConfig, configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.tsx",
    exclude: [...configDefaults.exclude, "e2e/*"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "html"],
    },
  },
});
