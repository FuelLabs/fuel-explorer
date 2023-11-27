import { getLastTxs } from '~/systems/Transaction/actions/get-last-txs';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

type PageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function Transactions({
  searchParams: { page = '1' },
}: PageProps) {
  const txs = await getLastTxs({ page: Number(page) });
  return <TxList transactions={txs} page={page} />;
}

export const revalidate = 10;
