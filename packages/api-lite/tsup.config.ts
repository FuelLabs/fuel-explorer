import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['cjs'],
  target: 'node20',
  platform: 'node',
  outDir: 'dist',
  bundle: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['better-sqlite3'],
  loader: { '.graphql': 'text', '.json': 'json' },
});
