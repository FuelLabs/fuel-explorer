import { makeExecutableSchema } from '@graphql-tools/schema';

import { createAccountsResolver } from '../../domains/Account';
import { createTokensResolver } from '../../domains/Token';

import typeDefs from './custom.graphql';

export const metadataSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      tokens: createTokensResolver,
      accounts: createAccountsResolver,
    },
  },
});
