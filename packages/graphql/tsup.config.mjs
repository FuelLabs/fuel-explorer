import graphqlLoaderPluginPkg from '@luckycatfactory/esbuild-graphql-loader';
import { execa } from 'execa';
import getPort from 'get-port';
import { defineConfig } from 'tsup';

const graphqlLoaderPlugin = graphqlLoaderPluginPkg.default;
// Assign a single port for the process
const port = await getPort({ port: 4444 });

export default defineConfig((options) => ({
  outDir: 'dist',
  splitting: true,
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: false,
  dts: false,
  minify: false,
  esbuildPlugins: [graphqlLoaderPlugin()],
  entry: { index: 'src/bin/index.ts' },
  async onSuccess() {
    if (options.watch) {
      const cmd = execa('node', ['--import', 'tsx/esm', './dist/index.js'], {
        stdio: 'inherit',
        cleanup: true,
        env: {
          SERVER_PORT: port,
          WATCH: Boolean(options.watch),
          FUEL_PROVIDER: process.env.FUEL_PROVIDER,
        },
      });
      // Wait process to close until restarting
      return async () => {
        const killProcess = new Promise((resolve) => {
          cmd.on('close', () => resolve(true));
        });
        cmd.kill('SIGTERM');
        await killProcess;
      };
    }
  },
}));
