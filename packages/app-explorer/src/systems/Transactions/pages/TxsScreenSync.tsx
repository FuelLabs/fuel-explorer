import { getLastTxs } from '~/systems/Transactions/actions/get-last-txs';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';

export async function TxsScreenSync({
  cursor,
  dir = 'next',
}: { cursor?: string | null; dir?: 'next' | 'prev' }) {
  const txs = await getLastTxs({ cursor, dir });
  return <TxList transactions={txs} />;
}
