import path from 'path';

import tsconfig from './tsconfig.json';

const defConfig = {
  outDir: 'dist',
  splitting: true,
  format: ['esm'],
  outExtension() {
    return {
      js: `.js`,
    };
  },
  sourcemap: true,
  clean: true,
  target: tsconfig.compilerOptions.target,
  tsconfig: path.resolve(__dirname, './tsconfig.build.json'),
};

export default [
  {
    ...defConfig,
    entry: [
      './src/components/**/index.tsx',
      '!./src/components/**/*.stories.tsx',
    ],
    outDir: 'dist/components',
  },
  {
    ...defConfig,
    entry: {
      index: 'src/index.tsx',
    },
    publicDir: 'public',
  },
  {
    ...defConfig,
    entry: {
      index: 'src/theme/tailwind-preset.ts',
    },
    format: ['cjs'],
    outDir: 'dist/theme',
  },
  {
    entry: {
      index: 'src/theme/index.css',
      tokens: 'src/theme/tokens.css',
    },
    loader: {
      '.css': 'css',
    },
  },
];
