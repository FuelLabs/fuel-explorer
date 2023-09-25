import { Heading } from '@fuels/ui';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { getLastTxs } from '~/systems/Transaction/actions/get-last-txs';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

export default async function Home() {
  const transactions = await getLastTxs({});
  return (
    <Layout hero>
      <Heading as="h2" size="2" className="mb-10">
        Recent Transactions
      </Heading>
      <TxList transactions={transactions} />
    </Layout>
  );
}
