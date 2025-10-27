'use server';
import { getLastTxs } from '~/systems/Transactions/actions/get-last-txs';

export async function fetchTxsData(
  cursor?: string | null,
  dir: 'after' | 'before' = 'after',
) {
  return await getLastTxs({ cursor, dir });
}
