import graphqlLoaderPluginPkg from '@luckycatfactory/esbuild-graphql-loader';
import { execa } from 'execa';
import { defineConfig } from 'tsup';

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
    const cmd = execa('node', ['./dist/index.js'], {
      stdio: 'inherit',
      cleanup: true,
      env: {
        SERVER_PORT: 4444,
        WATCH: Boolean(options.watch),
      },
    });

    return () => {
      cmd.kill('SIGTERM');
    };
  },
}));
