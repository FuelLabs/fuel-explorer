/* eslint-disable @typescript-eslint/no-explicit-any */
import { delegateToSchema } from '@graphql-tools/delegate';
import type { GraphQLResolveInfo } from 'graphql';
import { OperationTypeNode } from 'graphql';
import { metadataSchema } from '~/services/metadata';

export function delegateQueryTokens(
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
