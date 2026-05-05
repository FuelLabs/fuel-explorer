import { execSync } from 'node:child_process';

const BACKFILL_CMD = 'npx tsx src/backfill.ts';
const BACKFILL_ENV = {
  ...process.env,
  DB_HOST: '127.0.0.1',
  DB_PORT: '5435',
  DB_USER: 'postgres',
  DB_PASS: 'postgres',
  DB_NAME: 'postgres',
  FUEL_PROVIDER: 'https://mainnet.fuel.network/v1/graphql',
};

describe('Backfill script', () => {
  it('exits cleanly when no broken blocks exist', () => {
    const result = execSync(BACKFILL_CMD, {
      timeout: 15000,
      cwd: `${__dirname}/../..`,
      env: BACKFILL_ENV,
      encoding: 'utf-8',
    });

    expect(result).toContain('No broken blocks found');
  });

  it('exits within 10 seconds when clean', () => {
    const start = Date.now();

    execSync(BACKFILL_CMD, {
      timeout: 10000,
      cwd: `${__dirname}/../..`,
      env: BACKFILL_ENV,
      encoding: 'utf-8',
    });

    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(10000);
  });
});
