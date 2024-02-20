import * as zod from 'zod';
import { Env } from './infra/core/Env';

const schema = zod.object({
  FUEL_PROVIDER: zod.string(),
  SERVER_PORT: zod.string(),
  DB_HOST: zod.string(),
  DB_PORT: zod.string(),
  DB_USER: zod.string(),
  DB_PASS: zod.string(),
  DB_NAME: zod.string(),
  INNGEST_EVENT_KEY: zod.string(),
  INNGEST_SIGNING_KEY: zod.string(),
  INNGEST_BASE_URL: zod.string().optional(),
});

export const env = new Env(schema, {
  FUEL_PROVIDER: 'http://localhost:4001/graphql',
  SERVER_PORT: '3002',
  DB_HOST: 'localhost',
  DB_PORT: '5435',
  DB_USER: 'postgres',
  DB_PASS: 'postgres',
  DB_NAME: 'postgres',
  INNGEST_EVENT_KEY: 'inngest-event-key',
  INNGEST_SIGNING_KEY: 'inngest-sign',
  INNGEST_BASE_URL: 'http://127.0.0.1:8288',
});
