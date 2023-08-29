import { readFileSync } from 'fs';
import { join } from 'path';

export * as ExtenderResolvers from './resolvers';
export const ExtenderTypeDefs = readFileSync(
  join(__dirname, './extender.graphql'),
  'utf-8',
);
