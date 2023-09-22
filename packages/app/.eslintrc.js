const merge = require('deepmerge-json');
const { configs } = require('@fuels/eslint-plugin');
const baseConfig = require('../../.eslintrc.js');
const config = configs.next;

module.exports = merge.multi(baseConfig, config.next, {
  rules: {
    'no-html-link-for-pages': 'off',
  },
});
