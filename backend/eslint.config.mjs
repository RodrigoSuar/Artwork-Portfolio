// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";

export default [
  // Ignore common folders
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      "*.min.js",
    ],
  },

  // Base JavaScript recommended rules
  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      // Best practice
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
      "no-debugger": "warn",

      // Style (standard-ish without Prettier)
      "semi": ["error", "always"],
      "quotes": ["error", "double", { avoidEscape: true }],
      
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],

      // ES modern
      "prefer-const": "error",
      "no-var": "error",
      "arrow-body-style": ["error", "as-needed"],
    },
  },
];