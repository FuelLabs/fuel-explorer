import { getLastTxs } from "~/systems/Transactions/actions/get-last-txs";
import { TxList } from "~/systems/Transactions/components/TxList/TxList";

export async function TxsScreenSync({ page }: { page: string }) {
  const txs = await getLastTxs({ page: Number(page) });
  return <TxList transactions={txs} page={page} />;
}
