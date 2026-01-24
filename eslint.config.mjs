import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Disable rules that are too strict for this codebase
  {
    rules: {
      // Apostrophes and quotes in JSX text content are intentional
      "react/no-unescaped-entities": "off",
      // Setting state in effects is valid for initialization patterns
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
