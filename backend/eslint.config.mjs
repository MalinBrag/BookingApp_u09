import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        Request: "off",
        Response: "off",
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
  },
  {
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  pluginJs.configs.recommended,
];