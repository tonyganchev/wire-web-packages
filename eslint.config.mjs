import * as emotion from "@emotion/eslint-plugin";
import wireConfig from "@wireapp/eslint-config/flat";
import globals from "globals";

export default [
  {
    ignores: [
      "**/node_modules/**",
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
      "archive/**",
    ]
  },

  ...wireConfig.map((config) =>
    config.ignores ? config : {
      ...config,
      files: [...(config.files || []), "**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"]
    }),

  {
    name: "main",
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
    name: "stories",
    files: ["src/stories/**/*", "**/*.stories.*"],
    rules: {
      "import/no-default-export": "off"
    }
  },

  {
    name: "tests",
    files: ["**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "no-async-promise-executor": "off"
    }
  }
];
