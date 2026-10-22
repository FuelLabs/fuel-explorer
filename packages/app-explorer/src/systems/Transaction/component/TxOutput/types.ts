import type { GQLTransactionOutputFragment } from '@fuel-explorer/graphql';
import type { InputContract } from '~/systems/Transaction/component/TxInput/TxInputContract/types';

export type TxOutputProps<T = GQLTransactionOutputFragment> = {
  output: T;
  getContractByIndex: (index: number) => InputContract | undefined;
  txStatus?: string | null;
};
