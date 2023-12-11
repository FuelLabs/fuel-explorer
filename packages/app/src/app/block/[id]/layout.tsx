import { VStack } from '@fuels/ui';
import type { ReactNode } from 'react';
import { Layout } from '~/systems/Core/components/Layout/Layout';

export default function BlockLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <VStack>{children}</VStack>
    </Layout>
  );
}
