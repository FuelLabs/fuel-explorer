import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  dts: true,
  format: ['cjs', 'esm'],
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
  entry: {
    index: 'src/lib.ts',
  },
  minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
}));
