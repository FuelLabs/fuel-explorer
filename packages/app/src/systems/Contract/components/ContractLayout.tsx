'use client';

import { Address, VStack } from '@fuels/ui';
import { IconChecklist } from '@tabler/icons-react';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';

import { ContractTabs } from './ContractTabs';

export function ContractLayout({
  children,
  id,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <VStack className="gap-4 laptop:gap-8">
        <PageTitle
          icon={<IconChecklist size={24} stroke={1.2} />}
          className="border-b-gray-3"
        >
          Contract
          <Address value={id} full={true} fixed="b256" />
        </PageTitle>
        <ContractTabs contractId={id} />
        {children}
      </VStack>
    </Layout>
  );
}
