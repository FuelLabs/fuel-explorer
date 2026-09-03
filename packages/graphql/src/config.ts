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
  FUEL_CHAIN: zod.string().optional(),
});

export const env = new Env(schema, {
  DEBUG: true,
  FUEL_PROVIDER: 'http://localhost:4000/v1/graphql',
  FUEL_CHAIN: '',
});
