import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import './load.envs.js';

const { PORT, CI } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  base: CI ? '/portal/' : '/',
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
