/* eslint-disable @typescript-eslint/no-explicit-any */
import { delegateToSchema } from '@graphql-tools/delegate';
import type { GraphQLResolveInfo } from 'graphql';
import { OperationTypeNode } from 'graphql';
import { metadataSchema } from '~/graphql/services/metadata';

export function delegateQueryAccounts(
  addresses: Array<string>,
  context: any,
  info: GraphQLResolveInfo,
) {
  return delegateToSchema({
    schema: metadataSchema,
    operation: OperationTypeNode.QUERY,
    fieldName: 'accounts',
    args: { addresses },
    context,
    info,
  });
}
