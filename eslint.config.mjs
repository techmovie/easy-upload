import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import stylisticTs from '@stylistic/eslint-plugin-ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [{
  ignores: ['**/dist'],
}, ...compat.extends(
  'preact',
  'standard',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
), {
  files: [
    '**/*.js',
    '**/*.mjs',
    '**/*.cjs',
    '**/*.ts',
    '**/*.tsx',
  ],
  plugins: {
    react,
    '@typescript-eslint': typescriptEslint,
    '@stylistic/ts': stylisticTs,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.jquery,
      ...globals.greasemonkey,
    },

    parser: tsParser,
    ecmaVersion: 2020,
    sourceType: 'script',

    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  settings: {
    jest: {
      version: 26,
    },
  },

  rules: {
    'no-use-before-define': 0,
    semi: ['error', 'always'],
    'no-undef': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    indent: 'off',
    '@stylistic/ts/indent': ['error', 2],
  },
}];
