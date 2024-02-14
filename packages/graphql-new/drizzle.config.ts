import type { Config } from 'drizzle-kit';
import { requireEnv } from './src/utils/require-env';

const env = requireEnv([
  ['DB_HOST', '127.0.0.1'],
  ['DB_PORT', '5435'],
  ['DB_USER', 'postgres'],
  ['DB_PASSWORD', 'postgres'],
  ['DB_DATABASE', 'postgres'],
]);

export default {
  schema: './src/core/Schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`,
  },
} satisfies Config;
