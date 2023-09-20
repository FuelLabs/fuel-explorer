const { fuelThemePreset } = require('pn-ui-primitives/tw-theme');
const radixThemePlugin = require('radix-ui-themes-with-tailwind');
const plugin = require('tailwindcss/plugin');

/** @type {const('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.stories.{js,jsx,ts,tsx}',
  ],
  theme: {
    ...fuelThemePreset,
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-radix')({
      variantPrefix: false,
    }),
    plugin(function ({ addVariant }) {
      // Add a `third` variant, ie. `third:pb-0`
      addVariant('except-first', '& ~ &');
      addVariant('not-disabled', '&:not([aria-disabled=true])');
    }),
    radixThemePlugin({
      useTailwindColorNames: false, // optional
      useTailwindRadiusNames: true, // optional
      mapMissingTailwindColors: true, // optional
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};
