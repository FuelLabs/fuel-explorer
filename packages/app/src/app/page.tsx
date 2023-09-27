import { Heading } from '@fuels/ui';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { getLastTxs } from '~/systems/Transaction/actions/get-last-txs';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

export default async function Home() {
  const transactions = await getLastTxs({ last: 30 });
  return (
    <Layout hero>
      <Heading
        as="h2"
        size="2"
        className="flex justify-between items-center mb-10"
      >
        Recent Transactions
      </Heading>
      <TxList transactions={transactions.edges} />
    </Layout>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
