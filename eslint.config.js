// @ts-check

import taiymeConfig from '@taiyme/eslint-config';
import tsEslintParser from '@typescript-eslint/parser';
import gitignore from 'eslint-config-flat-gitignore';

const files = ['**/*.{js,ts}'];

/** @type {import('eslint').Linter.Config[]} */
export default [
  gitignore(),
  {
    name: 'u.taiy.me/ignores',
    ignores: [
      'patches/**',
      'pnpm-lock.yaml',
    ],
  },
  {
    name: 'u.taiy.me/setup',
    languageOptions: {
      globals: {},
      parser: tsEslintParser,
      parserOptions: {
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
