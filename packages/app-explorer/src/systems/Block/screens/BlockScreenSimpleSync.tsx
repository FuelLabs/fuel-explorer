import { TxsRouteProps } from '~/systems/Transactions/types';
import { getBlock } from '../actions/get-block';
import { getTransactionsByBlockId } from '../actions/get-transactions-by-block-id';
import { BlockScreenSimple } from '../components/BlockScreenSimple';
import type { BlockRouteParams } from '../types';

export async function BlockScreenSimpleSync({
  id,
  searchParams: { cursor, dir },
}: BlockRouteParams & TxsRouteProps) {
  const { block, producer } = await getBlock({ id });
  const transactions = await getTransactionsByBlockId({ id, cursor, dir });
  return (
    <BlockScreenSimple
      id={id}
      block={block}
      txs={transactions.transactionsByBlockId}
      producer={producer}
    />
  );
}
