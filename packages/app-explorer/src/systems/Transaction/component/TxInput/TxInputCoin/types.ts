import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql/sdk';
import type { TxInputProps } from '~/systems/Transaction/component/TxInput/types';

export type InputCoin = Extract<
  NonNullable<GQLTransactionItemFragment['inputs']>[number],
  { __typename: 'InputCoin' }
>;

export type TxInputCoinProps = TxInputProps & {
  input: InputCoin;
};
