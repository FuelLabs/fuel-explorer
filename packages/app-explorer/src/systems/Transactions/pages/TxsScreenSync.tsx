import { getRecentTxs } from '~/systems/Transactions/actions/get-recent-txs';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';

export async function TxsScreenSync({
  after,
  before,
}: { after?: string; before?: string }) {
  const { transactions, pageInfo } = await getRecentTxs({ after, before });

  return <TxList transactions={transactions} pageInfo={pageInfo} />;
}
