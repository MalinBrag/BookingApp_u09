import pkg from "globals";
const { browser } = pkg;
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import angularEslint from "@angular-eslint/eslint-plugin";
import angularEslintTemplate from "@angular-eslint/eslint-plugin-template";
import angularTemplateParser from "@angular-eslint/template-parser";
import parse from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: browser,
      parser: parse,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    ignores: ["**/*.spec.ts"],
    plugins: {
      "@typescript-eslint": tseslint,
      "@angular-eslint": angularEslint,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...angularEslint.configs.recommended.rules,
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],
    },
  },
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      "@angular-eslint/template": angularEslintTemplate,
    },
    rules: {
      ...angularEslintTemplate.configs.recommended.rules,
    },
  },
];
