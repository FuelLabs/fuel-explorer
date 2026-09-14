import { defineConfig } from 'tsup';

export default defineConfig({
  // Both files must land flat in dist/: DecodeWorkerPool resolves the
  // worker next to main.js.
  entry: { main: 'src/main.ts', decodeWorker: 'src/store/decodeWorker.ts' },
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
