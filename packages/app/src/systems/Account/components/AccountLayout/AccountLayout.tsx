'use client';

import { Address, Box, VStack, useBreakpoints } from '@fuels/ui';
import { IconHash } from '@tabler/icons-react';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';

export function AccountLayout({
  children,
  bytecode,
  id,
}: {
  children: React.ReactNode;
  bytecode?: string | null;
  id: string;
}) {
  const { isLaptop } = useBreakpoints();
  return (
    <Layout>
      <VStack className="gap-4 laptop:gap-8">
        <PageTitle
          icon={<IconHash size={20} stroke={1.2} />}
          className="border-b-gray-3"
        >
          Account
          <Address full={isLaptop} value={id} />
        </PageTitle>
        <AccountTabs accountId={id} isPredicate={!!bytecode} />
        <Box as="section">{children}</Box>
      </VStack>
    </Layout>
  );
}
