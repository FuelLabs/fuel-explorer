import { getLastTxs } from '~/systems/Transactions/actions/get-last-txs';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';

export async function TxsScreenSync({
  after,
  before,
}: { after?: string; before?: string }) {
  const { transactions, pageInfo } = await getLastTxs({ after, before });

  return <TxList transactions={transactions} pageInfo={pageInfo} />;
}
