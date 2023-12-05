import { Suspense } from 'react';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { getLastTxs } from '~/systems/Transaction/actions/get-last-txs';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';
import { TxsTitle } from '~/systems/Transaction/component/TxsTitle/TxsTitle';

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
    <Layout
      hero
      contentClassName="[&_.rt-ContainerInner]:space-y-2 tablet:[&_.rt-ContainerInner]:space-y-2 laptop:[&_.rt-ContainerInner]:space-y-10"
    >
      <TxsTitle />
      <Suspense
        key={page}
        fallback={<TxListLoader page={page} numberOfTxs={10} />}
      >
        <TransactionsSync page={page} />
      </Suspense>
    </Layout>
  );
}

export const revalidate = 10;
