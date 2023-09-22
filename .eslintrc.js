const merge = require('deepmerge-json');
const { resolve } = require('path');
const { configs } = require('@fuels/eslint-plugin');
const { dependencies } = require('./packages/ui/package.json');

const project = [
  resolve(__dirname, 'tsconfig.json'),
  resolve(__dirname, 'packages/**/tsconfig.json'),
];

const config = {
  root: true,
  parserOptions: {
    project,
  },
  settings: {
    react: {
      version: dependencies.react,
    },
    'import/resolver': {
      // TODO: add this extensions in the npm-packs
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
        project,
      },
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    // TODO: add this rules in the npm-packs
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'react-hooks/rules-of-hooks': 'off',
    'no-html-link-for-pages': 'off',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
  },
};

module.exports = merge.multi(
  configs.typescript,
  configs.react,
  configs.jest,
  config,
);
