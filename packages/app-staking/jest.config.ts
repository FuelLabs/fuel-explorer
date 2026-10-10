import type { Config } from '@fuels/jest/config';
import { config as baseConfig } from '@fuels/jest/config';

import pkg from './package.json';

const config: Config = {
  ...baseConfig,
  rootDir: __dirname,
  displayName: pkg.name,
  roots: ['<rootDir>/src'],
  setupFiles: [...(baseConfig.setupFiles ?? []), '<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: [require.resolve('@fuels/jest/setup')],
  // app-staking has no `~/` alias of its own; ~staking and ~portal are used.
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^~staking/(.*)$': '<rootDir>/src/$1',
    '^~portal/(.*)$': '<rootDir>/../app-portal/src/$1',
    '^~public-portal/(.*)$': '<rootDir>/../app-portal/public/$1',
  },
};

export default config;
