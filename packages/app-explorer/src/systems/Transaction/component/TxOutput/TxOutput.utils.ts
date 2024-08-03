import { TransactionOutputFragment } from '@fuel-explorer/graphql';

export const isOutput = <T extends TransactionOutputFragment>(
  output: TransactionOutputFragment,
  type: T['__typename'],
): output is T => {
  return output.__typename === type;
};
