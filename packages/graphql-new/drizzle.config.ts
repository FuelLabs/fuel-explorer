import type { Config } from 'drizzle-kit';
import { db } from './src/core/Database';

export default {
  schema: './src/core/Schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: db.connectionString(),
  },
} satisfies Config;
