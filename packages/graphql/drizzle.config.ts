import type { Config } from 'drizzle-kit';
import { Db } from './src/infra/database/Db';

export default {
  schema: './src/infra/database/DbSchema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: Db.connectionOpts(),
} satisfies Config;
