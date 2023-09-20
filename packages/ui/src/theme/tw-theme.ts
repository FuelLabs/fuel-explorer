import type { Config } from 'tailwindcss';

import { refColorVariablesAsObj } from '../utils/css';

const COLORS_VARIABLES = [
  // general colors
  'accent',
  'overlay',
  'panel',
  'panel-solid',
  'panel-translucent',
  'surface',
  'brand',
  'transparent',
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

const DEFAULT_SPACING = {
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  7: 'var(--space-7)',
  8: 'var(--space-8)',
  9: 'var(--space-9)',
  10: 'var(--space-10)',
  11: 'var(--space-11)',
  12: 'var(--space-12)',
  13: 'var(--space-13)',
  14: 'var(--space-14)',
  15: 'var(--space-15)',
  16: 'var(--space-16)',
  17: 'var(--space-17)',
  18: 'var(--space-18)',
};

export const fuelThemePreset: Config['theme'] = {
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
    space: DEFAULT_SPACING,
    spacing: DEFAULT_SPACING,
    colors: {
      black: '#000',
      white: '#fff',
      ...refColorVariablesAsObj(COLORS_VARIABLES),
    },
    borderRadius: {
      none: '0px',
      1: 'var(--radius-1)',
      2: 'var(--radius-2)',
      3: 'var(--radius-3)',
      4: 'var(--radius-4)',
      5: 'var(--radius-5)',
      6: 'var(--radius-6)',
      sm: 'var(--radius-3)',
      md: 'var(--radius-4)',
      lg: 'var(--radius-5)',
      xl: 'var(--radius-6)',
      full: '9999px',
      DEFAULT: 'var(--radius-md)',
    },
    boxShadow: {
      1: 'var(--shadow-1)',
      2: 'var(--shadow-2)',
      3: 'var(--shadow-3)',
      4: 'var(--shadow-4)',
      5: 'var(--shadow-5)',
      6: 'var(--shadow-6)',
    },
    fontSizes: {
      1: 'var(--font-size-1)',
      2: 'var(--font-size-2)',
      3: 'var(--font-size-3)',
      4: 'var(--font-size-4)',
      5: 'var(--font-size-5)',
      6: 'var(--font-size-6)',
      7: 'var(--font-size-7)',
      8: 'var(--font-size-8)',
      9: 'var(--font-size-9)',
      DEFAULT: 'var(--font-size-4)',
    },
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      bold: '700',
      DEFAULT: '400',
    },
    lineHeight: {
      1: 'var(--line-height-1)',
      2: 'var(--line-height-2)',
      3: 'var(--line-height-3)',
      4: 'var(--line-height-4)',
      5: 'var(--line-height-5)',
      6: 'var(--line-height-6)',
      7: 'var(--line-height-7)',
      8: 'var(--line-height-8)',
      9: 'var(--line-height-9)',
    },
    letterSpacing: {
      1: 'var(--letter-spacing-1)',
      2: 'var(--letter-spacing-2)',
      3: 'var(--letter-spacing-3)',
      4: 'var(--letter-spacing-4)',
      5: 'var(--letter-spacing-5)',
      6: 'var(--letter-spacing-6)',
      7: 'var(--letter-spacing-7)',
      8: 'var(--letter-spacing-8)',
      9: 'var(--letter-spacing-9)',
    },
  },
};
