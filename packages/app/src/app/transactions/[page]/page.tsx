import { redirect } from 'next/navigation';
import { getLastTxs } from '~/systems/Transaction/actions/get-last-txs';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

type PageProps = {
  params: {
    page: string;
  };
};

export const revalidate = 10;

export default async function Transactions({ params: { page } }: PageProps) {
  if (!page || page === '0') return redirect('/transactions/1');
  const txs = await getLastTxs({ page: Number(page) });
  return <TxList transactions={txs} />;
}
