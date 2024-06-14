import type { Config } from 'drizzle-kit';
import { db } from './src/infra/database/Db';

export default {
  schema: './src/infra/database/DbSchema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: db.connectionString(),
  },
} satisfies Config;
