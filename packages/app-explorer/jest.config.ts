import type { Config } from '@fuels/jest/config';
import { config as baseConfig } from '@fuels/jest/config';

// package.json is not imported: this package is "type": "module", so the
// ts-node loader gives the JSON default import as undefined.
const config: Config = {
  ...baseConfig,
  rootDir: __dirname,
  displayName: 'app-explorer',
  roots: ['<rootDir>'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^~portal/(.*)$': '<rootDir>/../app-portal/src/$1',
    '^~staking/(.*)$': '<rootDir>/../app-staking/src/$1',
  },
  setupFiles: [...(baseConfig.setupFiles ?? [])],
  setupFilesAfterEnv: [
    require.resolve('@fuels/jest/setup'),
    '<rootDir>/jest.setup.ts',
  ],
};

export default config;
