const RADIX_COLOR_SCALE = 12;

export type RadixColors =
  | 'gray'
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'bronze'
  | 'gold'
  | 'brown'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'mint';

export const radixColors = [
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'bronze',
  'gold',
  'brown',
  'orange',
  'amber',
  'yellow',
  'lime',
  'mint',
  'sky',
];

const radixGrayColors = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'];

const getColor = (color: string, scale: number, alpha?: boolean) => {
  const colors = Array.from(Array(scale).keys()).reduce(
    (acc, _, i) => {
      acc[i + 1] = `var(--${color}-${alpha ? 'a' : ''}${i + 1})`;
      return acc;
    },
    {} as Record<number | string, string>,
  ) as Record<string | number, string>;
  if (!alpha) {
    colors[`9-contrast`] = `var(--${color}-9-contrast)`;
    colors['surface'] = `var(--${color}-surface)`;
  }

  return colors;
};

const getGrayColor = (color: string, scale: number, alpha?: boolean) => {
  const colors = Array.from(Array(scale).keys()).reduce(
    (acc, _, i) => {
      acc[i + 1] = `var(--${color}-${alpha ? 'a' : ''}${i + 1})`;
      return acc;
    },
    {} as Record<number | string, string>,
  ) as Record<string | number, string>;
  if (!alpha) colors[`2-translucent`] = `var(--${color}-2-translucent)`;
  return colors;
};

const getColors = (arr: string[], isGray?: boolean) => {
  const colors = arr.reduce(
    (acc, color) => {
      acc[color] = isGray
        ? getGrayColor(color, RADIX_COLOR_SCALE, false)
        : getColor(color, RADIX_COLOR_SCALE, false);
      return acc;
    },
    {} as Record<string, Record<number | string, string>>,
  );

  const alphaColors = arr.reduce(
    (acc, color) => {
      acc[color + 'A'] = isGray
        ? getGrayColor(color, RADIX_COLOR_SCALE, true)
        : getColor(color, RADIX_COLOR_SCALE, true);
      return acc;
    },
    {} as Record<string, Record<number | string, string>>,
  );
  return { ...colors, ...alphaColors };
};

export const radixThemeColors = {
  accent: getColor('accent', RADIX_COLOR_SCALE),
  ...getColors(radixGrayColors, true),
  ...getColors(radixColors, true),
  gray: getGrayColor('gray', RADIX_COLOR_SCALE, true),
};
