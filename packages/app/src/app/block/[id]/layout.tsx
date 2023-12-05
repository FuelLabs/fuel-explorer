import { VStack } from '@fuels/ui';
import type { ReactNode } from 'react';
import { BlockTitle } from '~/systems/Block/components/BlockTitle';
import { Layout } from '~/systems/Core/components/Layout/Layout';

export default function BlockLayout({
  children,
  params: { id },
}: {
  children: ReactNode;
  params: { id: string };
}) {
  return (
    <Layout>
      <VStack>
        <BlockTitle id={id} />
        {children}
      </VStack>
    </Layout>
  );
}

export const fetchCache = 'force-static';
export const invalidate = Infinity;
