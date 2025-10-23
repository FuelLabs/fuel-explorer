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
  DEBUG: falsy.optional(),
  FUEL_PROVIDER: zod.string(),
  SERVER_PORT: zod.string(),
  SERVER_API_KEY: zod.string().optional().nullable(),
  DB_HOST: zod.string().optional(),
  DB_PORT: zod.string().optional(),
  DB_USER: zod.string().optional(),
  DB_PASS: zod.string().optional(),
  DB_NAME: zod.string().optional(),
  DB_HOST_REPLICA: zod.string().optional(),
  DB_PORT_REPLICA: zod.string().optional(),
  DB_USER_REPLICA: zod.string().optional(),
  DB_PASS_REPLICA: zod.string().optional(),
  DB_NAME_REPLICA: zod.string().optional(),
  RABBITMQ_HOST: zod.string().optional(),
  RABBITMQ_PORT: zod.string().optional(),
  RABBITMQ_USER: zod.string().optional(),
  RABBITMQ_PASS: zod.string().optional(),
  QUEUE_CONCURRENCY: zod.string().optional(),
  SSL: falsy.optional(),
  COINGECKO_API_KEY: zod.string().optional(),
  ALCHEMY_API_KEY: zod.string().optional(),
  FUEL_CHAIN: zod.string().optional(),
});

export const env = new Env(schema, {
  DEBUG: true,
  FUEL_PROVIDER: 'http://localhost:4000/v1/graphql',
  SERVER_PORT: '3002',
  SERVER_API_KEY: 'secret',
  DB_HOST: 'localhost',
  DB_PORT: '5435',
  DB_USER: 'postgres',
  DB_PASS: 'postgres',
  DB_NAME: 'postgres',
  RABBITMQ_HOST: 'localhost',
  RABBITMQ_PORT: '5672',
  RABBITMQ_USER: 'guest',
  RABBITMQ_PASS: 'guest',
  QUEUE_CONCURRENCY: '1000',
  SSL: false,
  COINGECKO_API_KEY: '',
  ALCHEMY_API_KEY: '',
  FUEL_CHAIN: '',
});
