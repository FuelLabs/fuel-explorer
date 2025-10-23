import type { GQLTransactionOutputFragment } from '@fuel-explorer/graphql';

export const isOutput = <T extends GQLTransactionOutputFragment>(
  output: GQLTransactionOutputFragment,
  type: T['__typename'],
): output is T => {
  return output.__typename === type;
};
