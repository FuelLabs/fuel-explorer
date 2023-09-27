/* eslint-disable @typescript-eslint/no-explicit-any */
import { delegateToSchema } from '@graphql-tools/delegate';
import type { GraphQLResolveInfo } from 'graphql';
import { OperationTypeNode } from 'graphql';

import tokensData from '../data/tokens.json';
import { metadataSchema } from '../services/metadata';

export class TokenDomain {
  constructor() {}

  delegateQuery(
    assetsId: Array<string>,
    context: any,
    info: GraphQLResolveInfo,
  ) {
    return delegateToSchema({
      schema: metadataSchema,
      operation: OperationTypeNode.QUERY,
      fieldName: 'tokens',
      args: { assetsId },
      context,
      info,
    });
  }

  static queryTokens(assetsId: string[]) {
    return assetsId
      .map((id) =>
        tokensData.find(
          (token) => token.assetId.toLowerCase() === id.toLowerCase(),
        ),
      )
      .filter((i) => !!i);
  }
}

export function createTokensResolver() {
  return function (
    _source: any,
    _args: any,
    { assetsId }: { assetsId: Array<string> },
  ) {
    return TokenDomain.queryTokens(assetsId);
  };
}
