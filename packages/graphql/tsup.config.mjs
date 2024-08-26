import { defineConfig } from 'tsup';
import { join } from 'node:path';
import fs from 'fs-extra';

export default defineConfig(() => [
  {
    outDir: 'dist',
    splitting: false,
    format: ['cjs'],
    sourcemap: true,
    clean: true,
    dts: false,
    minify: false,
    entry: {
      index: 'src/index.ts',
      app: 'src/app.ts',
      syncer: 'src/syncer.ts',
      consumer: 'src/consumer.ts',
      recover: 'src/recover.ts',
    },
    async onSuccess() {
      const cwd = process.cwd();
      const dirPath = join(cwd, 'dist/schemas');
      const srcPath = join(cwd, 'src/graphql/schemas');
      await fs.copy(srcPath, dirPath);
    },
  },
]);
