import path from 'path';
import { globbySync } from 'globby';
import _ from 'lodash';
import type { Config } from 'tailwindcss';
import tailwindDefaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

import { radixThemeTailwindPlugin } from '../utils/radixUiThemesTailwindPlugin';
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
  'success-contract',
  'success-border',
  'warning',
  'warning-muted',
  'warning-contract',
  'warning-border',
  'error',
  'error-muted',
  'error-contract',
  'error-border',
  'info',
  'info-muted',
  'info-contract',
  'info-border',
  // card colors
  'card-bg',
  'card-title',
  'card-border',
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
      backgroundImage: {
        'dark-gradient':
          'linear-gradient(243.06deg, #00F58C -52.89%, #0F4B32 10.83%, #141414 65.48%)',
        'light-gradient':
          'linear-gradient(243.06deg, #00F58C -52.89%, #A7FFD4 10.83%, #FFFFFF 65.48%)',
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
      addVariant('first-child', '& > :first-child');
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
    radixThemeTailwindPlugin({
      useTailwindColorNames: false, // optional
      useTailwindRadiusNames: true, // optional
      mapMissingTailwindColors: true, // optional
    }),
  ],
};

export default preset;
