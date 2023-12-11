import type { ReactNode } from 'react';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { TxsTitle } from '~/systems/Transaction/component/TxsTitle/TxsTitle';

export default function TxLayout({ children }: { children: ReactNode }) {
  return (
    <Layout hero contentClassName="[&_.rt-ContainerInner]:space-y-10">
      <TxsTitle />
      {children}
    </Layout>
  );
}
