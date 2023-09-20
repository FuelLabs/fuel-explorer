import radixThemePlugin from 'radix-ui-themes-with-tailwind';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import { fuelThemePreset } from './src/theme/tw-theme';

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.stories.{js,jsx,ts,tsx}',
  ],
  theme: fuelThemePreset,
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
} satisfies Config;
