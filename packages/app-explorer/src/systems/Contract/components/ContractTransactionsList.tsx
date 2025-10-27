import type {
  GQLTransactionsByOwnerQuery,
  Maybe,
} from '@fuel-explorer/graphql';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';

type TabTransactionsProps = {
  contractId: string;
  txs?: Maybe<GQLTransactionsByOwnerQuery['transactionsByOwner']>;
};

export function ContractTransactionsList({
  contractId,
  txs,
}: TabTransactionsProps) {
  return (
    <TxList
      transactions={txs?.nodes}
      pageInfo={txs?.pageInfo}
      owner={contractId}
      className="-mt-4 tablet:mt-0 laptop:mt-6"
      route="contractTxs"
    />
  );
}
