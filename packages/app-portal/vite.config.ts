import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import './load.envs.js';

const { PORT, NO_PORTAL, CI } = process.env;

// NO_PORTAL can be set on .env for local development
// directly on the .env file or on the command line
// to run the app without the /portal prefix
const basePortal = NO_PORTAL ? '/' : '/portal';
process.env.BASE_URL = basePortal;

// https://vitejs.dev/config/
export default defineConfig({
  base: basePortal,
  server: {
    port: Number(PORT),
  },
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env': {},
  },
  build: {
    target: ['es2020'],
    ...(CI
      ? { outDir: resolve(__dirname, '../app-explorer/public/portal') }
      : {}),
  },
});
