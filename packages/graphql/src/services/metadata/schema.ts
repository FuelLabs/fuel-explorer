import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { join } from 'path';

import { QueryTokens, QueryAccounts } from './resolvers';

export const metadataSchema = makeExecutableSchema({
  typeDefs: readFileSync(join(__dirname, './custom.graphql'), 'utf-8'),
  resolvers: {
    Query: {
      tokens: QueryTokens,
      accounts: QueryAccounts,
    },
  },
});
