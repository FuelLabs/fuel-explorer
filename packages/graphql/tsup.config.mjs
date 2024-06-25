import { defineConfig } from 'tsup';

const { SERVER_BUILD } = process.env;
const isServerBuild = SERVER_BUILD === 'true';

export default defineConfig(() => ({
  outDir: 'dist',
  splitting: true,
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: false,
  dts: !isServerBuild,
  minify: false,
  entry: {
    index: 'src/index.ts',
    app: 'src/app.ts',
    syncer: 'src/syncer.ts',
  },
}));
