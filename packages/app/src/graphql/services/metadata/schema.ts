import { makeExecutableSchema } from '@graphql-tools/schema';

import typeDefs from './custom.graphql';
import { QueryTokens, QueryAccounts } from './resolvers';

export const metadataSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      tokens: QueryTokens,
      accounts: QueryAccounts,
    },
  },
});
