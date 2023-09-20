import { Layout } from '~/systems/Core/components/Layout/Layout';
import { getLastTxs } from '~/systems/Transaction/actions/get-last-txs';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

export default async function Home() {
  const transactions = await getLastTxs({});
  return (
    <Layout hero>
      <TxList transactions={transactions} />
    </Layout>
  );
}
