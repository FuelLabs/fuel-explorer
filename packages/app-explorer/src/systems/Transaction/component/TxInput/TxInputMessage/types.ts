import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql/sdk';
import type { TxInputProps } from '~/systems/Transaction/component/TxInput/types';

export type InputMessage = Extract<
  NonNullable<GQLTransactionItemFragment['inputs']>[number],
  { __typename: 'InputMessage' }
>;

export type TxInputMessageProps = TxInputProps & {
  input: InputMessage;
};
