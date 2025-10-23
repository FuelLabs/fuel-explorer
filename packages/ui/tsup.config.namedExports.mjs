import tsconfig from './tsconfig.json';

const NO_CODE_SPLIT = process.env.NO_CODE_SPLIT === 'true';

if (NO_CODE_SPLIT) {
  console.log('\x1b[33m%s\x1b[0m', 'Code splitting is disabled!!');
}

const componentsEntry = {
  Text: 'src/components/Text/Text.tsx',
  Flex: 'src/components/Box/Flex.tsx',
  Button: 'src/components/Button/Button.tsx',
  Box: 'src/components/Box/Box.tsx',
  Heading: 'src/components/Heading/Heading.tsx',
  Separator: 'src/components/Separator/Separator.tsx',
  Switch: 'src/components/Switch/Switch.tsx',
  Input: 'src/components/Input/Input.tsx',
  Link: 'src/components/Link/Link.tsx',
  Grid: 'src/components/Box/Grid.tsx',
  Badge: 'src/components/Badge/Badge.tsx',
  Card: 'src/components/Card/Card.tsx',
  HStack: 'src/components/Box/HStack.tsx',
  VStack: 'src/components/Box/VStack.tsx',
  Tooltip: 'src/components/Tooltip/Tooltip.tsx',
  IconButton: 'src/components/IconButton/IconButton.tsx',
  Progress: 'src/components/Progress/Progress.tsx',
  BlockieAvatar: 'src/components/BlockieAvatar/BlockieAvatar.tsx',
};

// Split in groups of 3
const componentsSegmentedEntry = Object.keys(componentsEntry).reduce(
  (acc, curr) => {
    const current = acc[acc.length - 1];
    if (!current || Object.keys(current).length >= 3) {
      acc.push({
        [curr]: componentsEntry[curr],
      });
      return acc;
    }
    current[curr] = componentsEntry[curr];
    return acc;
  },
  [],
);

/* This is needed to not get any errors from dynamic requiring */
const EXTERNAL_PACKAGES = [
  'react',
  'react-dom',
  'tailwindcss',
  'next',
  'tailwind-variants',
  'fuels',
  '@fuel-ts/address',
  '@fuel-ts/math',
];

export const defConfig = {
  outDir: 'dist',
  splitting: !NO_CODE_SPLIT, // Disable splitting if NO_CODE_SPLIT is true
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
  sourcemap: true,
  clean: false,
  target: tsconfig.compilerOptions.target,
  esbuildOptions(options) {
    options.banner = {
      js: "'use client'",
    };

    options.external = EXTERNAL_PACKAGES;
  },
};

export default componentsSegmentedEntry.map((entry) => ({
  ...defConfig,
  esbuildOptions(options) {
    options.external = EXTERNAL_PACKAGES;
  },
  entry,
  outDir: 'dist/components',
}));
