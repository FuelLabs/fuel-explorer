import path from 'path';
import { globbySync } from 'globby';
import _ from 'lodash';
import radixThemePlugin from 'radix-ui-themes-with-tailwind';
import type { Config } from 'tailwindcss';
import tailwindDefaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

import { animation, keyframes } from './animations';
import { breakpoints } from './breakpoints';

function getComponents() {
  return globbySync(['**'], {
    cwd: path.resolve(__dirname, '../components'),
    onlyDirectories: true,
    deep: 1,
  });
}

export type ColorVariables = (typeof COLORS_VARIABLES)[number];
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
  // semantic colors
  'success',
  'success-muted',
  'success-contrast',
  'success-border',
  'warning',
  'warning-muted',
  'warning-contrast',
  'warning-border',
  'error',
  'error-muted',
  'error-contrast',
  'error-border',
  'info',
  'info-muted',
  'info-contrast',
  'info-border',
  // card colors
  'card-bg',
  'card-title',
  'card-border',
  // new colors
  'blue1',
  'blue2',
  'blue3',
  'blue4',
  'blue5',
  'blue6',
  'blue7',
  'blue8',
  'blue9',
  'blue10',
  'blue11',
  'blue12',
  'brand1',
  'brand2',
  'brand3',
  'brand4',
  'brand5',
  'brand6',
  'brand7',
  'brand8',
  'brand9',
  'brand10',
  'brand11',
  'brand12',
  'gray1',
  'gray2',
  'gray3',
  'gray4',
  'gray5',
  'gray6',
  'gray7',
  'gray8',
  'gray9',
  'gray10',
  'gray11',
  'gray12',
  'orange1',
  'orange2',
  'orange3',
  'orange4',
  'orange5',
  'orange6',
  'orange7',
  'orange8',
  'orange9',
  'orange10',
  'orange11',
  'orange12',
  'red1',
  'red2',
  'red3',
  'red4',
  'red5',
  'red6',
  'red7',
  'red8',
  'red9',
  'red10',
  'red11',
  'red12',
  'violet1',
  'violet2',
  'violet3',
  'violet4',
  'violet5',
  'violet6',
  'violet7',
  'violet8',
  'violet9',
  'violet10',
  'violet11',
  'violet12',
  'yellow1',
  'yellow2',
  'yellow3',
  'yellow4',
  'yellow5',
  'yellow6',
  'yellow7',
  'yellow8',
  'yellow9',
  'yellow10',
  'yellow11',
  'yellow12',
] as const;

function refColorVariablesAsObj() {
  return COLORS_VARIABLES.reduce(
    (acc, curr) => {
      acc[curr] = `var(--color-${curr})`;
      return acc;
    },
    {} as Record<string, string>,
  );
}

const preset: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.stories.{js,jsx,ts,tsx}',
  ],
  theme: {
    space: tailwindDefaultTheme.space,
    spacing: tailwindDefaultTheme.spacing,
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      keyframes,
      animation,
      width: tailwindDefaultTheme.maxWidth,
      fontSize: {
        h1: 'var(--font-size-9)',
        h2: 'var(--font-size-8)',
        h3: 'var(--font-size-7)',
        h4: 'var(--font-size-6)',
        h5: 'var(--font-size-5)',
        h6: 'var(--font-size-4)',
      },
      colors: {
        ...refColorVariablesAsObj(),
      },
      screens: {
        mobile: `${breakpoints.mobile}px`,
        tablet: `${breakpoints.tablet}px`,
        laptop: `${breakpoints.laptop}px`,
        desktop: `${breakpoints.desktop}px`,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('tailwindcss-radix')({
      variantPrefix: false,
    }),
    plugin(({ addVariant, matchVariant }) => {
      // Add a `third` variant, ie. `third:pb-0`
      addVariant('not-first', '& ~ &');
      addVariant('not-first-last', '&:not(:first-of-type,:last-of-type)');
      addVariant('not-disabled', '&:not([aria-disabled=true],:disabled)');
      addVariant(
        'not-disabled-hover',
        '&:not([aria-disabled=true],:disabled):hover',
      );
      addVariant('first-type', '&:first-of-type');
      addVariant('last-type', '&:last-of-type');
      addVariant('dark-theme', ['.dark &', '.dark-theme &']);
      addVariant('light-theme', ['.light &', '.light-theme &']);

      const components = getComponents();
      const componentsMap = _.fromPairs(components.map((c) => [c, c]));
      const values = { values: componentsMap };
      matchVariant('>fuel', (v) => `& > .fuel-${v}`, values);
      matchVariant('>group-fuel', (v) => `:merge(.group) > .fuel-${v}`, values);
      matchVariant('>peer-fuel', (v) => `:merge(.peer) > .fuel-${v}`, values);
      matchVariant('fuel', (v) => `& .fuel-${v}`, values);
      matchVariant('group-fuel', (v) => `:merge(.group) > .fuel-${v}`, values);
      matchVariant('peer-fuel', (v) => `:merge(.peer) > .fuel-${v}`, values);
    }),
    radixThemePlugin({
      useTailwindColorNames: false, // optional
      useTailwindRadiusNames: true, // optional
      mapMissingTailwindColors: true, // optional
    }),
  ],
};

export default preset;
