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
    <Layout hero>
      <TransactionsTitle page={params.page} />
      {children}
    </Layout>
  );
}
