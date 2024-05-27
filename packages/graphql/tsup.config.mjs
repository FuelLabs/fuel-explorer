import graphqlLoaderPluginPkg from '@luckycatfactory/esbuild-graphql-loader';
import 'dotenv/config';
import { execa } from 'execa';
import { defineConfig } from 'tsup';

const graphqlLoaderPlugin = graphqlLoaderPluginPkg.default;
// Assign a single port for the process
const { SERVER_BUILD } = process.env;

const isServerBuild = SERVER_BUILD === 'true';

export default defineConfig((options) => ({
  outDir: 'dist',
  splitting: true,
  format: ['esm', 'cjs'],
  external: ['@fuels/assets'],
  sourcemap: true,
  clean: false,
  dts: !isServerBuild,
  minify: false,
  esbuildPlugins: [graphqlLoaderPlugin()],
  entry: ['src/bin/index.ts'],
  async onSuccess() {
    if (isServerBuild) return;
    const cmd = execa('node', ['--import', 'tsx/esm', './dist/index.js'], {
      stdio: 'inherit',
      cleanup: true,
      env: {
        CODE_GEN: true,
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
  },
}));
