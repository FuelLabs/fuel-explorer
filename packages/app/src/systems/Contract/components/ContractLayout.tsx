'use client';

import { VStack } from '@fuels/ui';
import { Layout } from '~/systems/Core/components/Layout/Layout';

export function ContractLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <VStack className="gap-4 laptop:gap-8">{children}</VStack>
    </Layout>
  );
}
