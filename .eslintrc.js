const { resolve } = require('path');
const { dependencies } = require('./packages/app/package.json');

const project = [
  resolve(__dirname, './tsconfig.json'),
  resolve(__dirname, './packages/**/tsconfig.json'),
];

module.exports = {
  root: true,
  extends: [
    'plugin:@fuels/typescript',
    'plugin:@fuels/jest',
    'plugin:@fuels/react',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
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
    // TODO: add this rules in the npm-packs
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent'],
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    'no-html-link-for-pages': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: true,
        reservedFirst: true,
        multiline: 'last',
        reservedFirst: true,
      },
    ],
  },
};
