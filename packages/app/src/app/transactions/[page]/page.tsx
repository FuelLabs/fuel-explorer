import { redirect } from 'next/navigation';
import { getLastTxs } from '~/systems/Transaction/actions/get-last-txs';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

type PageProps = {
  params: {
    page: string;
  };
};

export default async function Transactions({
  params: { page = '1' },
}: PageProps) {
  if (!page || page === '0') return redirect('/transactions/1');
  const txs = await getLastTxs({ page: Number(page) });
  return <TxList transactions={txs} page={page} />;
}

export const revalidate = 10;
