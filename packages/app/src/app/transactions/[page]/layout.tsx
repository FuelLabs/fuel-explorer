import type { ReactNode } from 'react';
import { Layout } from '~/systems/Core/components/Layout/Layout';

import { TransactionsTitle } from './title';

export default async function LayoutTransactions({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Layout
      hero
      contentClassName="[&_.rt-ContainerInner]:space-y-2 tablet:[&_.rt-ContainerInner]:space-y-2 laptop:[&_.rt-ContainerInner]:space-y-10"
    >
      <TransactionsTitle />
      {children}
    </Layout>
  );
}
