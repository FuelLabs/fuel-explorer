import type { Config } from 'drizzle-kit';
import { db } from './src/infra/database/Db';

export default {
  schema: './src/infra/database/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: db.connectionString(),
  },
} satisfies Config;
