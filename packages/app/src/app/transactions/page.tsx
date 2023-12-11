import { Suspense } from 'react';
import { getLastTxs } from '~/systems/Transaction/actions/get-last-txs';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';

type PageProps = {
  searchParams: {
    page?: string;
  };
};

async function TransactionsSync({ page }: { page: string }) {
  const txs = await getLastTxs({ page: Number(page) });
  return <TxList transactions={txs} page={page} />;
}

export default async function Transactions({
  searchParams: { page = '1' },
}: PageProps) {
  return (
    <Suspense
      key={page}
      fallback={<TxListLoader page={page} numberOfTxs={10} />}
    >
      <TransactionsSync page={page} />
    </Suspense>
  );
}

export const revalidate = 10;
