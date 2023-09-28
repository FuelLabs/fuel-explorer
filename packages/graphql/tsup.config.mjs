import graphqlLoaderPluginPkg from '@luckycatfactory/esbuild-graphql-loader';

const graphqlLoaderPlugin = graphqlLoaderPluginPkg.default;
const defConfig = {
  outDir: 'dist',
  splitting: true,
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  esbuildPlugins: [graphqlLoaderPlugin()],
};

export default [{ ...defConfig, entry: { index: 'src/bin.ts' } }];
