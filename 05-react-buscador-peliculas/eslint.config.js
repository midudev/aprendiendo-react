import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import jsxRuntimeConfig from "eslint-plugin-react/configs/jsx-runtime.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  ...fixupConfigRules(jsxRuntimeConfig),
  {
    rules: {
      "react/prop-types": [0],
    },
  },
];
