import type { GQLTransactionOutputFragment } from '@fuel-explorer/graphql';
import type { CardProps } from '@fuels/ui';

export type TxOutputProps<T = GQLTransactionOutputFragment> = CardProps & {
  output: T;
};
