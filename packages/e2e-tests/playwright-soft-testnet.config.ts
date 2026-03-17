import { join } from 'node:path';

import config from './playwright.config';

const softTestnetConfig = {
  ...config,
  testMatch: join(__dirname, './tests/soft/**/*.test.ts'),
  // Exclude ecosystem test for testnet (has loading issues with built app)
  testIgnore: join(__dirname, './tests/soft/ecosystem/**/*.test.ts'),
  reporter: [
    ['list', { printSteps: true }],
    [
      'html',
      { outputFolder: join(__dirname, './playwright-html/soft-testnet/') },
    ],
  ],
};

export default softTestnetConfig;
