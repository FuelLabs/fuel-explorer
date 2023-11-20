import { Layout } from '~/systems/Core/components/Layout/Layout';
import { TxListLoader } from '~/systems/Transaction/component/TxList/TxListLoader';

import { TransactionsTitle } from './title';

export default async function Loading() {
  return (
    <Layout
      hero
      contentClassName="[&_.rt-ContainerInner]:space-y-2 tablet:[&_.rt-ContainerInner]:space-y-2 laptop:[&_.rt-ContainerInner]:space-y-10"
    >
      <TransactionsTitle />
      <TxListLoader numberOfTxs={10} />
    </Layout>
  );
}
