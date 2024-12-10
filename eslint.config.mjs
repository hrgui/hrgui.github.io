import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import parser from "astro-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/*.css"],
  },
  ...fixupConfigRules(
    compat.extends(
      "plugin:@typescript-eslint/recommended",
      "plugin:astro/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended"
    )
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        React: true,
        JSX: true,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    ignores: ["*.css"],

    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },

      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      "import/extensions": 0,

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],

      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.astro"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],

    settings: {
      "disable/plugins": "@typescript-eslint",
    },
  },
  {
    files: ["**/*.astro"],

    languageOptions: {
      parser: parser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
  },
];
