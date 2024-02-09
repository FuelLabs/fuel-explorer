import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import './load.envs.js';

const { PORT, NODE_ENV, CI } = process.env;

const basePortal = NODE_ENV === 'production' ? '/portal' : '/';
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
