const { resolve } = require('path');

const project = [
  resolve(__dirname, 'tsconfig.json'),
  resolve(__dirname, 'packages/**/tsconfig.json'),
];

module.exports = {
  root: true,
  extends: ['plugin:@fuels/base'],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        project,
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/rules-of-hooks': 'off',
  },
};
