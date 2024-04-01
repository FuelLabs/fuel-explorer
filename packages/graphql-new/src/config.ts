import * as zod from 'zod';
import { Env } from './core/Env';

const schema = zod.object({
  FUEL_PROVIDER: zod.string(), // @TODO: Remove it in order to use only FUEL_CHAIN_NAME
  FUEL_CHAIN_NAME: zod.string(),
  ETH_CHAIN_NAME: zod.string(),
  ETH_ALCHEMY_ID: zod.string().optional(),
  ETH_INFURA_ID: zod.string().optional(),
  SERVER_PORT: zod.string().default('3000'),
  DB_HOST: zod.string(),
  DB_PORT: zod.string(),
  DB_USER: zod.string(),
  DB_PASS: zod.string(),
  DB_NAME: zod.string(),
});

export const env = new Env(schema, {
  FUEL_PROVIDER: 'http://localhost:4001/graphql', // @TODO: Remove it in order to use only FUEL_CHAIN_NAME
  FUEL_CHAIN_NAME: 'fuelBeta5',
  ETH_CHAIN_NAME: 'sepolia',
  ETH_ALCHEMY_ID: '',
  ETH_INFURA_ID: '',
  SERVER_PORT: '3002',
  DB_HOST: 'localhost',
  DB_PORT: '5435',
  DB_USER: 'postgres',
  DB_PASS: 'postgres',
  DB_NAME: 'postgres',
});
