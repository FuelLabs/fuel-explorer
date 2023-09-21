import radixThemePlugin from 'radix-ui-themes-with-tailwind';
import type { Config } from 'tailwindcss';
import tailwindDefaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

function refColorVariablesAsObj(list: string[]) {
  return list.reduce(
    (acc, curr) => {
      acc[curr] = `var(--color-${curr})`;
      return acc;
    },
    {} as Record<string, string>,
  );
}

const COLORS_VARIABLES = [
  // general colors
  'accent',
  'brand',
  'border',
  'border-hover',
  // text colors
  'color',
  'secondary',
  'muted',
  'heading',
  'icon',
  'link',
  // card colors
  'card-bg',
  'card-title',
  'card-border',
];

const preset: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.stories.{js,jsx,ts,tsx}',
  ],
  theme: {
    keyframes: {
      'accordion-down': {
        from: {
          height: '0px',
        },
        to: {
          height: 'var(--radix-accordion-content-height)',
        },
      },
      'accordion-up': {
        from: {
          height: 'var(--radix-accordion-content-height)',
        },
        to: {
          height: '0px',
        },
      },
    },
    animation: {
      'accordion-open': 'accordion-down 0.2s ease-out',
      'accordion-closed': 'accordion-up 0.2s ease-in',
    },
    extend: {
      width: tailwindDefaultTheme.maxWidth,
      colors: {
        ...refColorVariablesAsObj(COLORS_VARIABLES),
      },
    },
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
};

export default preset;
