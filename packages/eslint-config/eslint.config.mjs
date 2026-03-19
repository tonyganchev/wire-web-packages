import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import jestPlugin from "eslint-plugin-jest";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import headerPlugin from "@tony.ganchev/eslint-plugin-header";
import jsdocPlugin from "eslint-plugin-jsdoc";
import noUnsanitizedPlugin from "eslint-plugin-no-unsanitized";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import jestDomPlugin from "eslint-plugin-jest-dom";
import betterStyledComponentsPlugin from "eslint-plugin-better-styled-components";
import globals from "globals";

const year = new Date().getFullYear();

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [".git/", "docs/", "bin/", "**/node_modules/"],
  },

  {
    name: "@wireapp/eslint-config/jest",
    ...jestPlugin.configs["flat/recommended"],
  },
  {
    name: "@wireapp/eslint-config/jsx-a11y",
    ...jsxA11yPlugin.flatConfigs.recommended,
  },
  {
    name: "@wireapp/eslint-config/@typescript-eslint/eslint-recommended",
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    rules: {
      "constructor-super": "off",     // ts(2335) & ts(2377)
      "getter-return": "off",         // ts(2378)
      "no-const-assign": "off",       // ts(2588)
      "no-dupe-args": "off",          // ts(2300)
      "no-dupe-class-members": "off", // ts(2393) & ts(2300)
      "no-dupe-keys": "off",          // ts(1117)
      "no-func-assign": "off",        // ts(2630)
      "no-import-assign": "off",      // ts(2632) & ts(2540)
      "no-new-symbol": "off",         // ts(7009)
      "no-new-native-nonconstructor": "off", // ts(7009)
      "no-obj-calls": "off",          // ts(2349)
      "no-redeclare": "off",          // ts(2451)
      "no-setter-return": "off",      // ts(2408)
      "no-this-before-super": "off",  // ts(2376) & ts(17009)
      "no-undef": "off",              // ts(2304) & ts(2552)
      "no-unreachable": "off",        // ts(7027)
      "no-unsafe-negation": "off",    // ts(2365) & ts(2322) & ts(2358)
      "prefer-rest-params": "error",  // ts provides better types with rest args
    },
  },
  {
    name: "@wireapp/eslint-config/import",
    ...importPlugin.flatConfigs.recommended,
  },
  {
    name: "@wireapp/eslint-config/import-typescript",
    ...importPlugin.flatConfigs.typescript
  },
  {
    name: "@wireapp/eslint-config/react",
    ...reactPlugin.configs.flat.recommended,
  },
  {
    name: "@wireapp/eslint-config/react-jsx-runtime",
    ...reactPlugin.configs.flat["jsx-runtime"],
  },
  {
    name: "@wireapp/eslint-config/no-unsanitized",
    ...noUnsanitizedPlugin.configs.recommended,
  },
  {
    name: "@wireapp/eslint-config/main",
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: ".",
        sourceType: "module",
        project: ["./tsconfig.json"],
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooksPlugin,
      "prettier": prettierPlugin,
      "header": headerPlugin,
      "jsdoc": jsdocPlugin,
      "unused-imports": unusedImportsPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "testing-library": testingLibraryPlugin,
      "jest-dom": jestDomPlugin,
      "better-styled-components": betterStyledComponentsPlugin,
    },
    settings: {
      react: { version: "detect" },
      "import/parsers": {
        "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          paths: "./tsconfig.json",
        },
      },
    },
    rules: {
      "constructor-super": "error",
      curly: "error",
      "header/header": [
        "error",
        {
          header: {
            commentType: "block",
            lines: [
              "",
              " * Wire",
              {
                pattern: /^ \* Copyright \(C\) \d{4} Wire Swiss GmbH$/,
                template: ` * Copyright (C) ${year} Wire Swiss GmbH`,
              },
              " *",
              " * This program is free software: you can redistribute it and/or modify",
              " * it under the terms of the GNU General Public License as published by",
              " * the Free Software Foundation, either version 3 of the License, or",
              " * (at your option) any later version.",
              " *",
              " * This program is distributed in the hope that it will be useful,",
              " * but WITHOUT ANY WARRANTY; without even the implied warranty of",
              " * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the",
              " * GNU General Public License for more details.",
              " *",
              " * You should have received a copy of the GNU General Public License",
              " * along with this program. If not, see http://www.gnu.org/licenses/.",
              " *",
              " ",
            ],
          },
          trailingEmptyLines: {
            minimum: 2,
          },
        },
      ],
      "no-cond-assign": "error",
      "no-console": [
        "error",
        {
          allow: ["error", "info", "warn"],
        },
      ],
      "no-const-assign": "error",
      "no-dupe-class-members": "error",
      "no-duplicate-case": "error",
      "no-else-return": "error",
      "no-inner-declarations": "error",
      "no-lonely-if": "error",
      "no-magic-numbers": [
        "warn",
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
        },
      ],
      "no-restricted-globals": [
        "warn",
        {
          message: "Do not commit `fit`. Use `it` instead.",
          name: "fit",
        },
        {
          message: "Do not commit `fdescribe`. Use `describe` instead.",
          name: "fdescribe",
        },
      ],
      "no-sequences": "error",
      "no-sparse-arrays": "error",
      "no-trailing-spaces": "error",
      "no-undef": "error",
      "no-unneeded-ternary": "error",
      "no-unused-expressions": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "none",
        },
      ],
      "no-useless-return": "error",
      "no-var": "error",
      "one-var": ["error", "never"],
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-object-spread": "error",
      "prefer-promise-reject-errors": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "prettier/prettier": "error",
      "jest/no-jasmine-globals": "error",
      "jest/no-identical-title": "warn",
      "jest/no-done-callback": "warn",
      "jest/no-disabled-tests": "warn",
      "jest/no-conditional-expect": "warn",
      "jsx-a11y/media-has-caption": "warn",
      "jsx-a11y/no-noninteractive-tabindex": "warn",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/prefer-stateless-function": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "sort-vars": "error",
      "@typescript-eslint/require-array-sort-compare": "warn",
      strict: ["error", "global"],
      "unused-imports/no-unused-imports": "error",
      "import/no-unresolved": "error",
      "import/no-default-export": "error",
      "import/order": [
        "error",
        {
          groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@wireapp/*",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "@wireapp/*"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          warnOnUnassignedImports: true,
        },
      ],
      "better-styled-components/sort-declarations-alphabetically": 2,
      "valid-jsdoc": [
        "error",
        {
          prefer: {
            class: "class",
            return: "returns",
          },
          preferType: {
            Boolean: "boolean",
            Number: "number",
            object: "Object",
            String: "string",
          },
          requireParamDescription: true,
          requireReturnDescription: true,
        },
      ],
    },
  },
  {
    name: "@wireapp/eslint-config/prettier",
    ...prettierConfig,
  }
];
