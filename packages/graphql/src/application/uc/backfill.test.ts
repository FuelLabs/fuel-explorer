import { execSync } from 'node:child_process';
import path from 'node:path';

describe('Backfill script', () => {
  it('exits cleanly when no broken blocks exist', () => {
    const backfillPath = path.resolve(__dirname, '../../backfill.ts');
    const result = execSync(`npx tsx ${backfillPath}`, {
      timeout: 15000,
      env: {
        ...process.env,
        DB_HOST: '127.0.0.1',
        DB_PORT: '5435',
        DB_USER: 'postgres',
        DB_PASS: 'postgres',
        DB_NAME: 'postgres',
        FUEL_PROVIDER: 'https://mainnet.fuel.network/v1/graphql',
      },
      encoding: 'utf-8',
    });

    expect(result).toContain('No broken blocks found');
  });

  it('exits within 10 seconds when clean', () => {
    const backfillPath = path.resolve(__dirname, '../../backfill.ts');
    const start = Date.now();

    execSync(`npx tsx ${backfillPath}`, {
      timeout: 10000,
      env: {
        ...process.env,
        DB_HOST: '127.0.0.1',
        DB_PORT: '5435',
        DB_USER: 'postgres',
        DB_PASS: 'postgres',
        DB_NAME: 'postgres',
        FUEL_PROVIDER: 'https://mainnet.fuel.network/v1/graphql',
      },
      encoding: 'utf-8',
    });

    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(10000);
  });
});
