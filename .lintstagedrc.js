module.exports = {
  '**/*.(md|mdx|json|html|css)': ['prettier --write'],
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '.{ts,tsx}': ['tsc --noEmit'],
};
