import { EmptyTransactions } from '~/systems/Core/components/EmptyBlocks/EmptyTransactions';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

import { getAccountTransactions } from '../actions/get-account-transactions';

export async function AccountTransactionsScreen({ id }: { id: string }) {
  const txs = await getAccountTransactions({ owner: id });
  const transactions = txs.edges;
  if (!transactions.length) {
    return <EmptyTransactions entity="account" />;
  }

  return <TxList hidePagination transactions={transactions} />;
}
