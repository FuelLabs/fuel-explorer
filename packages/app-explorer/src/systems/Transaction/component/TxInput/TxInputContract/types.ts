import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql/sdk';

export type InputContract = Extract<
  NonNullable<GQLTransactionItemFragment['inputs']>[number],
  { __typename: 'InputContract' }
>;

export type TxInputContractProps = {
  input: InputContract;
};
