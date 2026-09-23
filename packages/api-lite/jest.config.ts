import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['**/?(*.)+(test).ts'],
  transform: { '^.+\\.(t|j)sx?$': '@swc/jest' },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/../graphql/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  verbose: true,
};

export default config;
