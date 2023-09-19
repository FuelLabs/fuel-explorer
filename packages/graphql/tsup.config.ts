import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: { index: 'src/generated/graphql.ts' },
  minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
}));
