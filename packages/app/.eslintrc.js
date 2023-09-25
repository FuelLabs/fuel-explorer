const config = require('../../.eslintrc.js');

module.exports = {
  extends: [
    'plugin:@fuels/typescript',
    'plugin:@fuels/jest',
    'plugin:@fuels/react',
    'plugin:@fuels/next',
  ],
  rules: config.rules,
};
