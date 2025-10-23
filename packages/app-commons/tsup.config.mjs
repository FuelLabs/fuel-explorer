import { defineConfig } from 'tsup';

export default defineConfig(() => [
  {
    outDir: 'dist',
    splitting: false,
    format: ['esm', 'cjs'],
    outExtension({ format }) {
      return {
        js: `.${format}.js`,
      };
    },
    sourcemap: true,
    clean: true,
    dts: true,
    minify: false,
    entry: {
      stakingAddresses: './src/utils/stakingAddresses.ts',
    },
  },
]);
