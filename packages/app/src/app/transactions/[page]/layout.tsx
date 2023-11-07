import type { ReactNode } from 'react';
import { Layout } from '~/systems/Core/components/Layout/Layout';

import { TransactionsTitle } from './title';

export default async function LayoutTransactions({
  params,
  children,
}: {
  children: ReactNode;
  params: { page: string };
}) {
  return (
    <Layout
      hero
      contentClassName="[&_.rt-ContainerInner]:space-y-2 md:[&_.rt-ContainerInner]:space-y-2 lg:[&_.rt-ContainerInner]:space-y-10"
    >
      <TransactionsTitle page={params.page} />
      {children}
    </Layout>
  );
}
