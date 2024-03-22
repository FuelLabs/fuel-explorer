import { join } from 'path';
import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

const IS_CI = !!process.env.CI;
const PORT = process.env.PORT || 3000;

const config: PlaywrightTestConfig = defineConfig({
  workers: 1,
  testMatch: join(__dirname, './bridge/**/*.test.ts'),
  testDir: join(__dirname, './bridge/'),
  timeout: 60_000 * 10,
  expect: {
    timeout: 5000,
  },
  reporter: [['html'], ['list', { printSteps: true }]],
  // Fail the build on CI if left test.only in the source code
  forbidOnly: !!process.env.CI,
  // Retry tests on CI if they fail
  retries: IS_CI ? 0 : 0,
  // retries: IS_CI ? 2 : 0,
  webServer: {
    command: 'pnpm dev',
    port: Number(PORT),
    reuseExistingServer: true,
    cwd: join(__dirname, '../../'),
  },
  use: {
    baseURL: `http://127.0.0.1:${PORT}/`,
    permissions: ['clipboard-read', 'clipboard-write'],
    trace: 'on-first-retry',
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

export default config;
