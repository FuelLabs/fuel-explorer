import * as zod from 'zod';
import { Env } from './core/Env';

const falsy = zod.coerce
  .string()
  .transform((value) =>
    value === 'true' || value === '1'
      ? true
      : value === 'false' || value === '0'
        ? false
        : value,
  );

const schema = zod.object({
  LOG_DIR: zod.string().optional(),
  DEBUG: falsy.optional(),
  DEBUG_PAYLOAD: falsy.optional(),
  FUEL_PROVIDER: zod.string(),
  HOST: zod.string().optional(),
  SERVER_PORT: zod.string(),
  SERVER_API_KEY: zod.string().optional().nullable(),
  SYNCER_PORT: zod.string(),
  DB_HOST: zod.string().optional(),
  DB_PORT: zod.string().optional(),
  DB_USER: zod.string().optional(),
  DB_PASS: zod.string().optional(),
  DB_NAME: zod.string().optional(),
  RABBITMQ_HOST: zod.string().optional(),
  RABBITMQ_PORT: zod.string().optional(),
  RABBITMQ_USER: zod.string().optional(),
  RABBITMQ_PASS: zod.string().optional(),
  SYNC_MISSING: falsy.optional(),
  SERVER_BUILD: falsy.optional(),
  IS_DEV_TEST: falsy.optional(),
  SYNC_OFFSET: zod.string().optional(),
  SYNC_LIMIT: zod.string().optional(),
  QUEUE_CONCURRENCY: zod.string().optional(),
  WATCH_INTERVAL: zod.string().optional(),
  SSL: falsy.optional(),
});

export const env = new Env(schema, {
  LOG_DIR: '/var/log',
  DEBUG: true,
  DEBUG_PAYLOAD: false,
  FUEL_PROVIDER: 'http://localhost:4000/v1/graphql',
  HOST: 'localhost',
  SERVER_PORT: '3002',
  SERVER_API_KEY: 'secret',
  SYNCER_PORT: '3003',
  DB_HOST: 'localhost',
  DB_PORT: '5435',
  DB_USER: 'postgres',
  DB_PASS: 'postgres',
  DB_NAME: 'postgres',
  RABBITMQ_HOST: 'localhost',
  RABBITMQ_PORT: '5672',
  RABBITMQ_USER: 'guest',
  RABBITMQ_PASS: 'guest',
  SERVER_BUILD: false,
  SYNC_MISSING: false,
  IS_DEV_TEST: false,
  SYNC_OFFSET: '10',
  SYNC_LIMIT: '10000',
  QUEUE_CONCURRENCY: '1000',
  WATCH_INTERVAL: '5000',
  SSL: false,
});
