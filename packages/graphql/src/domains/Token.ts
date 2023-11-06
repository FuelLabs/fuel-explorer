/* eslint-disable @typescript-eslint/no-explicit-any */
import { delegateToSchema } from '@graphql-tools/delegate';
import type { GraphQLResolveInfo } from 'graphql';
import { OperationTypeNode } from 'graphql';

import tokensData from '../data/tokens.json';
import { Domain } from '../utils/domain';

type Args = {
  assetsId: Array<string>;
};

export class TokenDomain extends Domain<any, Args> {
  static delegateQuery(
    assetsId: Array<string>,
    context: any,
    info: GraphQLResolveInfo,
  ) {
    return delegateToSchema({
      schema: info.schema,
      operation: OperationTypeNode.QUERY,
      fieldName: 'tokens',
      args: { assetsId },
      context,
      info,
    });
  }

  static createResolvers() {
    const domain = new TokenDomain();
    return {
      ...domain.createResolver('tokens'),
    };
  }

  get tokens() {
    const { assetsId } = this.args;
    return assetsId
      .map((id) =>
        tokensData.find(
          (token) => token.assetId.toLowerCase() === id.toLowerCase(),
        ),
      )
      .filter((i) => !!i);
  }
}
