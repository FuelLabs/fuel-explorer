import * as zod from 'zod';
import { Env } from './core/Env';

const schema = zod.object({
  FUEL_PROVIDER: zod.string(),
  SERVER_PORT: zod.string().default('3000'),
  DB_HOST: zod.string(),
  DB_PORT: zod.string(),
  DB_USER: zod.string(),
  DB_PASS: zod.string(),
  DB_NAME: zod.string(),
});

export const env = new Env(schema, {
  FUEL_PROVIDER: 'http://localhost:4001/graphql',
  SERVER_PORT: '3002',
  DB_HOST: 'localhost',
  DB_PORT: '5435',
  DB_USER: 'postgres',
  DB_PASS: 'postgres',
  DB_NAME: 'postgres',
});
