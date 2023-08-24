import type { GraphQLFieldResolver } from 'graphql';

import tokensData from '../../data/tokens.json';

export const QueryTokens: GraphQLFieldResolver<
  any,
  any,
  {
    assetsId: Array<string>;
  }
> = (_, { assetsId }) => {
  return assetsId
    .map((id) =>
      tokensData.find(
        (token) => token.assetId.toLowerCase() === id.toLowerCase(),
      ),
    )
    .filter((i) => !!i);
};
