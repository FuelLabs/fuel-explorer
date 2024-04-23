import type { Config } from 'drizzle-kit';
import { db } from './src/db';

export default {
  schema: '../core/src/infra/database/DbSchema.ts',
  out: '../core/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: db.connectionString(),
  },
} satisfies Config;
