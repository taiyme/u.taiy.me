// @ts-check

import taiymeConfig from '@taiyme/eslint-config';
import tsEslintParser from '@typescript-eslint/parser';
import gitignore from 'eslint-config-flat-gitignore';

const files = ['**/*.{js,ts}'];

/** @type {import('eslint').Linter.Config[]} */
export default [
  gitignore(),
  {
    languageOptions: {
      globals: {},
      parser: tsEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    files,
  },
  ...[
    ...taiymeConfig.configs.typescript,
  ].map((config) => ({
    ...config,
    files,
  })),
];
