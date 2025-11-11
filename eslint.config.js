import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import unusedImports from 'eslint-plugin-unused-imports';
import sortExportAll from 'eslint-plugin-sort-export-all';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  prettierConfig,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'typescript-sort-keys': typescriptSortKeys,
      'unused-imports': unusedImports,
      'sort-export-all': sortExportAll,
      'sort-destructure-keys': sortDestructureKeys,
      'simple-import-sort': simpleImportSort,
      prettier: prettier,
    },
    rules: {
      // general
      'no-console': 'warn',
      // eslint plugins
      'typescript-sort-keys/string-enum': 'error',
      'typescript-sort-keys/interface': 'error',
      'sort-export-all/sort-export-all': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': [
        2,
        {
          caseSensitive: true,
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      // typescript
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      // prettier
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['src/**/index.{ts,tsx}'],
    rules: {
      'sort-export-all/sort-export-all': 'error',
    },
  },
]);
