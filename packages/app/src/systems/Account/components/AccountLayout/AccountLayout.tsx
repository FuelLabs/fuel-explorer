'use client';

import { Address, VStack, useBreakpoints } from '@fuels/ui';
import { IconHash } from '@tabler/icons-react';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';

export function AccountLayout({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { isLaptop } = useBreakpoints();
  console.log(isLaptop);
  return (
    <Layout>
      <VStack className="gap-4 laptop:gap-8">
        <PageTitle
          icon={<IconHash size={20} stroke={1.2} />}
          className="border-b-gray-3"
        >
          Account
          <Address full={isLaptop || true} value={id} />
        </PageTitle>
        {children}
      </VStack>
    </Layout>
  );
}
