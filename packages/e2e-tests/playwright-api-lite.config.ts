import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || 3000;
const API_LITE_PORT = process.env.API_LITE_PORT || 3004;
// The local node started by `pnpm node:start` (docker/docker-compose.yml)
// exposes fuel-core's GraphQL endpoint on this port.
const FUEL_CORE_GRAPHQL_URL =
  process.env.FUEL_CORE_GRAPHQL_URL || 'http://127.0.0.1:4000/v1/graphql';
// Outside the repo so a stale index never shows up as an untracked file.
const API_LITE_DATA_DIR = join(tmpdir(), 'fuel-explorer-api-lite-e2e-data');

const config: PlaywrightTestConfig = defineConfig({
  workers: 1,
  testMatch: join(__dirname, './tests/api-lite/**/*.test.ts'),
  testDir: join(__dirname, './tests/'),
  timeout: 60_000 * 3,
  expect: {
    timeout: 15_000,
  },
  reporter: process.env.CI
    ? [['blob'], ['github'], ['list', { printSteps: true }]]
    : [
        ['list', { printSteps: true }],
        [
          'html',
          {
            outputFolder: join(__dirname, './playwright-report/api-lite/'),
            open: 'never',
          },
        ],
      ],
  // Fail the build on CI if left test.only in the source code
  forbidOnly: !!process.env.CI,
  retries: 0,
  webServer: [
    {
      // api-lite in RPC mode, indexing directly from the local fuel-core
      // node (no S3, no cosmos/L1 vars: staking/bridge routes answer 503,
      // which the staking smoke test asserts against). `/health` only
      // returns 200 once servedTip > 0, so this doubles as "wait for the
      // first block to be indexed" -- hence the generous timeout below.
      //
      // tsup's bundle looks for its GraphQL schema/provider-query documents
      // under dist/schemas and dist/provider first (see schemasDir() in
      // src/graphql/schema.ts and providerDocPath() in
      // src/fuelcore/FuelCoreClient.ts); its source-tree fallback path is
      // only correct when running from src/ (ts-node/tsx), not from the
      // bundled dist/main.js, so those directories must be populated here --
      // mirroring docker/vps/Dockerfile.api-lite's build stage.
      command:
        'pnpm --filter api-lite build && ' +
        'mkdir -p packages/api-lite/dist/schemas packages/api-lite/dist/provider && ' +
        'cp packages/graphql/src/graphql/schemas/*.graphql packages/api-lite/dist/schemas/ && ' +
        'cp packages/graphql/src/graphql/queries/provider/*.graphql packages/api-lite/dist/provider/ && ' +
        'node packages/api-lite/dist/main.js',
      url: `http://127.0.0.1:${API_LITE_PORT}/health`,
      reuseExistingServer: true,
      cwd: join(__dirname, '../../'),
      stdout: 'pipe',
      stderr: 'pipe',
      timeout: 60_000 * 4,
      env: {
        BLOCK_SOURCE: 'rpc',
        FUEL_PROVIDER: FUEL_CORE_GRAPHQL_URL,
        PORT: String(API_LITE_PORT),
        DATA_DIR: API_LITE_DATA_DIR,
      },
    },
    {
      command: 'pnpm --filter=app-explorer start',
      port: Number(PORT),
      reuseExistingServer: true,
      cwd: join(__dirname, '../../'),
      stdout: 'pipe',
      timeout: 60_000 * 10,
    },
  ],
  use: {
    baseURL: `http://127.0.0.1:${PORT}/`,
    headless: true,
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
