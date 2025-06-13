import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import eslintPluginReactCompiler from "eslint-plugin-react-compiler";
import hooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

/** @type {import('typescript-eslint').Config} */
export default tseslint.config(
  {
    ignores: [
      // Globally ignored files
      ".expo/**",
      "expo-plugins/**",
      "**/*.config.*",
      "android/**",
      "ios/**",
      "drizzle/**",
    ],
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      "react-hooks": hooksPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintPluginReactCompiler.configs.recommended,
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        2,
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        {
          allowConstantLoopConditions: true,
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unsafe-declaration-merging": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...hooksPlugin.configs.recommended.rules,
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: {
      parserOptions: { project: true },
      globals: { React: "writable" },
    },
  },
);
