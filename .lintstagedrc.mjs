export default {
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}': [
    'biome check --apply-unsafe --no-errors-on-unmatched',
  ],
};
