import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql/sdk';
import type { TxInputProps } from '~/systems/Transaction/component/TxInput/types';

export type InputContract = Extract<
  NonNullable<GQLTransactionItemFragment['inputs']>[number],
  { __typename: 'InputContract' }
>;

export type TxInputContractProps = TxInputProps & {
  input: InputContract;
};
