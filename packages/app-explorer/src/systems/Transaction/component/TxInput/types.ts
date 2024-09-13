import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql/sdk';
import type { CardProps } from '@fuels/ui';

export type TxInputProps = CardProps & {
  input: NonNullable<GQLTransactionItemFragment['inputs']>[number] | undefined;
};
