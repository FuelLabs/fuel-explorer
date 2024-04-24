import * as zod from 'zod';
import { Env } from './shared/Env';

const falsy = zod.coerce.string().transform((value) => value === 'true');

const schema = zod.object({
  FUEL_PROVIDER: zod.string().default('http://localhost:4001/graphql'),
  SERVER_PORT: zod.string().default('3000'),
  DB_HOST: zod.string().default('localhost'),
  DB_PORT: zod.string().default('5435'),
  DB_USER: zod.string().default('postgres'),
  DB_PASS: zod.string().default('postgres'),
  DB_NAME: zod.string().default('postgres'),
  DB_MIGRATE: falsy.optional().default('true'),
  SYNC_MISSING: falsy.optional().default('false'),
  SERVER_BUILD: falsy.optional().default('false'),
});

export const env = new Env(schema);
