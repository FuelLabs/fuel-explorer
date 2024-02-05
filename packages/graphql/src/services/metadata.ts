import { makeExecutableSchema } from "@graphql-tools/schema";

import { AccountDomain } from "../domains/Account";
import { TokenDomain } from "../domains/Token";

import typeDefs from "./metadata.graphql";

export const customSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...AccountDomain.createResolvers(),
      ...TokenDomain.createResolvers(),
    },
  },
});
