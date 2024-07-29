import { EmptyTransactions } from '~/systems/Core/components/EmptyBlocks/EmptyTransactions';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';

import { getAccountTransactions } from '../actions/get-account-transactions';

export async function AccountTransactionsSync({ id }: { id: string }) {
  const txs = await getAccountTransactions({ owner: id });
  if (!txs.nodes.length) {
    return <EmptyTransactions entity="account" />;
  }

  return (
    <TxList hidePagination transactions={txs.nodes} pageInfo={txs.pageInfo} />
  );
}
