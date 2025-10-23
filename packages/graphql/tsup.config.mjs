import { join } from 'node:path';
import fs from 'fs-extra';
import { defineConfig } from 'tsup';

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
      sdk: 'src/graphql/generated/sdk.ts',
      'sdk-provider': 'src/graphql/generated/sdk-provider.ts',
      app: 'src/app.ts',
      syncer: 'src/syncer.ts',
      consumer: 'src/consumer.ts',
      assets: 'src/assets.ts',
      balance: 'src/balance.ts',
      l1: 'src/l1.ts',
      cosmos: 'src/cosmos.ts',
      jobs: 'src/jobs.ts',
    },
    async onSuccess() {
      const cwd = process.cwd();
      const dirPath = join(cwd, 'dist/schemas');
      const srcPath = join(cwd, 'src/graphql/schemas');
      await fs.copy(srcPath, dirPath);
    },
  },
]);
