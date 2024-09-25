import { join } from 'path';
import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || 3001;

const config: PlaywrightTestConfig = defineConfig({
  workers: 1,
  testMatch: join(__dirname, './tests/hard/**/*.test.ts'),
  testDir: join(__dirname, './tests/'),
  timeout: 60_000 * 10,
  expect: {
    timeout: 5000,
  },
  reporter: process.env.CI
    ? [['list', { printSteps: true }]]
    : [
        ['list', { printSteps: true }],
        ['html', { outputFolder: join(__dirname, './playwright-html/hard/') }],
        ['github'],
      ],
  // Fail the build on CI if left test.only in the source code
  forbidOnly: !!process.env.CI,
  retries: 0,
  webServer: {
    command: 'pnpm dev:explorer',
    port: Number(PORT),
    reuseExistingServer: true,
    cwd: join(__dirname, '../../'),
    stdout: 'pipe',
  },
  use: {
    baseURL: `http://127.0.0.1:${PORT}/`,
    permissions: ['clipboard-read', 'clipboard-write'],
    headless: false,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

export default config;
