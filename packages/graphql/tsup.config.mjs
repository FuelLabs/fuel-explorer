import graphqlLoaderPluginPkg from '@luckycatfactory/esbuild-graphql-loader';
import { defineConfig } from 'tsup';

import { devServer } from './scripts/dev-server.mjs';

const graphqlLoaderPlugin = graphqlLoaderPluginPkg.default;

export default defineConfig((options) => ({
  outDir: 'dist',
  splitting: true,
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: false,
  esbuildPlugins: [graphqlLoaderPlugin()],
  entry: { index: 'src/bin.ts' },
  async onSuccess() {
    if (options.watch) {
      await devServer();
    }
  },
}));
