import globals from "globals";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import stylisticJs from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    ignores: ["dist/**"],
  },

  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
    plugins: {
      "@stylistic": stylisticJs,
    },
    rules: {
      "@stylistic/linebreak-style": ["error", "unix"],
      
      
    },
  },

  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);