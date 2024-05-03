import * as zod from 'zod';
import { Env } from './core/Env';

const falsy = zod.coerce.string().transform((value) => value === 'true');

const schema = zod.object({
  FUEL_PROVIDER: zod.string(),
  SERVER_PORT: zod.string().default('3000'),
  DB_HOST: zod.string(),
  DB_PORT: zod.string(),
  DB_USER: zod.string(),
  DB_PASS: zod.string(),
  DB_NAME: zod.string(),
  DB_MIGRATE: falsy.optional(),
  SYNC_MISSING: falsy.optional(),
  SERVER_BUILD: falsy.optional(),
  IS_DEV_TEST: falsy.optional(),
  SYNC_OFFSET: zod.string().optional().default('10'),
  SYNC_LIMIT: zod.string().optional().default('10000'),
  QUEUE_CONCURRENCY: zod.string().optional().default('500'),
});

export const env = new Env(schema, {
  FUEL_PROVIDER: 'http://localhost:4001/graphql',
  SERVER_PORT: '3002',
  DB_HOST: 'localhost',
  DB_PORT: '5435',
  DB_USER: 'postgres',
  DB_PASS: 'postgres',
  DB_NAME: 'postgres',
  SERVER_BUILD: false,
  DB_MIGRATE: false,
  SYNC_MISSING: false,
  IS_DEV_TEST: false,
  SYNC_OFFSET: '10',
  SYNC_LIMIT: '10000',
  QUEUE_CONCURRENCY: '500',
});
