import { EmptyTransactions } from '~/systems/Core/components/EmptyBlocks/EmptyTransactions';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';

import { getAccountTransactions } from '../actions/get-account-transactions';

export async function AccountTransactionsSync({
  id,
  cursor,
  dir,
}: {
  id: string;
  cursor?: string | null | undefined;
  dir?: 'after' | 'before';
}) {
  const txs = await getAccountTransactions({ owner: id, cursor, dir });
  if (!txs.nodes.length) {
    return <EmptyTransactions entity="account" />;
  }

  return (
    <TxList
      transactions={txs.nodes}
      pageInfo={txs.pageInfo}
      owner={id}
      route="accountTxs"
    />
  );
}
