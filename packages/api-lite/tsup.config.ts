import { defineConfig } from 'tsup';

export default defineConfig({
  // Named entries keep both files flat in dist/: the Dockerfile copies
  // dist/* without recursing, and DecodeWorkerPool resolves the worker script
  // next to main.js.
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
