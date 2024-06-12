import { join } from 'path';

import config from './playwright.config';

const softConfig = {
  ...config,
  testMatch: join(__dirname, './tests/soft/**/*.test.ts'),
  reporter: [
    ['list', { printSteps: true }],
    ['html', { outputFolder: join(__dirname, './playwright-html/soft/') }],
  ],
};

export default softConfig;
