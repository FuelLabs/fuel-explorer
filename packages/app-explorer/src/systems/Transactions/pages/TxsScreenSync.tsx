import { getLastTxs } from '~/systems/Transactions/actions/get-last-txs';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';

export async function TxsScreenSync({
  cursor,
  dir = 'after',
}: { cursor?: string | null; dir?: 'after' | 'before' }) {
  const txs = await getLastTxs({ cursor, dir });
  return (
    <TxList transactions={txs.nodes} pageInfo={txs.pageInfo} route="home" />
  );
}
