import * as emotion from "@emotion/eslint-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      "**/lib/**",
      "**/dist/**",
      "**/coverage/**",
      "**/.awcache/**",
      "**/.nyc_output/**",
      "**/.tmp/**",
      "**/temp/**",
      "**/.yarn/**",
      "**/.storybook/**",
      "**/demo/**",
      "**/bin/**",
      "**/styleguide/**",
      "**/*config.js",
      "**/eslint*",
      "**/*hot-update.js*",
      "**/*.env",
      ".git/**",
      "archive/**"
    ]
  },

  ...compat.extends("@wireapp/eslint-config").map((config) => ({
    ...config,
    files: [...config.files || [], "**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"]
  })),

  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "@emotion": emotion,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        NodeJS: "readonly"
      },
    },

    rules: {
      "@emotion/pkg-renaming": "error",
      "@emotion/no-vanilla": "error",
      "@emotion/import-from-emotion": "error",
      "@emotion/styled-import": "error",
      "id-length": "off",
      "no-dupe-class-members": "off",
      "no-magic-numbers": "off",
      "valid-jsdoc": "off",
      "import/no-unresolved": "off",
      "jest/no-jasmine-globals": "error",
      "jest/no-identical-title": "warn",
      "jest/no-done-callback": "warn",
      "jest/no-disabled-tests": "warn",
      "jest/no-conditional-expect": "warn",
      "jest/valid-describe-callback": "warn",
      "jest/valid-title": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/heading-has-content": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      // Differences from legacy config.
      "no-unused-vars": "off",
      "no-empty": "off",
      "no-useless-catch": "off",
      "no-case-declarations": "off",
      "no-prototype-builtins": "off"
    },
  },

  {
    files: ["src/stories/**/*", "**/*.stories.*"],
    rules: {
      "import/no-default-export": "off"
    }
  },

  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "no-async-promise-executor": "off"
    }
  }
];
