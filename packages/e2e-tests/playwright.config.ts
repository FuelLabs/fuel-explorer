import { join } from 'node:path';
import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || 3000;

const config: PlaywrightTestConfig = defineConfig({
  workers: 1,
  testMatch: join(__dirname, './tests/hard/**/*.test.ts'),
  testDir: join(__dirname, './tests/'),
  timeout: 60_000 * 12,
  expect: {
    timeout: 10_000,
  },
  reporter: process.env.CI
    ? [['blob'], ['github'], ['list', { printSteps: true }]]
    : [
        ['list', { printSteps: true }],
        [
          'html',
          {
            outputFolder: join(__dirname, './playwright-report/'),
            open: 'never',
          },
        ],
      ],
  // Fail the build on CI if left test.only in the source code
  forbidOnly: !!process.env.CI,
  retries: 0,
  webServer: {
    command: 'pnpm --filter=app-explorer start',
    port: Number(PORT),
    reuseExistingServer: true,
    cwd: join(__dirname, '../../'),
    stdout: 'pipe',
    timeout: 60_000 * 10,
  },
  use: {
    baseURL: `http://127.0.0.1:${PORT}/`,
    permissions: ['clipboard-read', 'clipboard-write'],
    headless: false,
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

export default config;
