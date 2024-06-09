import globals from "globals";
import pluginJs from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        process: "readonly"
      }
    },
    plugins: {
      react: reactPlugin
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      semi: ["error", "always"],
      quotes: ["error", "double"]
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];