export default {
  '**/*.(js|jsx|ts|tsx|md|json|mdx|html|css)': [
    'biome check --apply-unsafe --diagnostic-level=error --max-diagnostics=1000 --no-errors-on-unmatched',
  ],
};
