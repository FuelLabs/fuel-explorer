export default {
  "**/*.(js|jsx|ts|tsx|md|mdx|html|css)": [
    "biome format --write",
    "biome lint --apply-unsafe",
  ],
};
