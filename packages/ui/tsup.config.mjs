import postcss from '@chialab/esbuild-plugin-postcss';
import { defConfig } from './tsup.config.namedExports.mjs';

/* This is needed to not get any errors from dynamic requiring */

export default [
  {
    ...defConfig,
    entry: {
      index: 'src/index.ts',
    },
    publicDir: 'public',
  },
  {
    ...defConfig,
    entry: {
      index: 'src/theme/tailwind-preset.ts',
    },
    format: ['cjs', 'esm'],
    outDir: 'dist/theme',
  },
  {
    ...defConfig,
    entry: { styles: 'src/theme/index.css' },
    outDir: 'dist',
    esbuildPlugins: [postcss()],
  },
];
