import graphqlLoaderPluginPkg from '@luckycatfactory/esbuild-graphql-loader';

import tsconfig from './tsconfig.json';

const graphqlLoaderPlugin = graphqlLoaderPluginPkg.default;
const defConfig = {
  outDir: 'dist',
  splitting: true,
  format: ['cjs'],
  sourcemap: true,
  clean: true,
  target: tsconfig.compilerOptions.target,
  esbuildPlugins: [graphqlLoaderPlugin()],
};

export default [{ ...defConfig, entry: { index: 'src/bin.ts' } }];
