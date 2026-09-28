import type { Config } from '@fuels/jest/config';
import { config as baseConfig } from '@fuels/jest/config';

import pkg from './package.json';

const config: Config = {
  ...baseConfig,
  rootDir: __dirname,
  displayName: pkg.name,
  roots: ['<rootDir>'],
  setupFiles: [...(baseConfig.setupFiles ?? []), '<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: [require.resolve('@fuels/jest/setup')],
};

export default config;
