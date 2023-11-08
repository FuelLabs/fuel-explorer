'use client';

import { Address, Box, VStack } from '@fuels/ui';
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
  return (
    <Layout>
      <VStack>
        <PageTitle icon={<IconHash size={20} stroke={1.2} />}>
          Account
          <Address full value={id} />
        </PageTitle>
        <AccountTabs accountId={id} isPredicate={!!bytecode} />
        <Box
          as="section"
          className="mt-4 laptop:mt-8 px-4 tablet:px-8 laptop:px-0"
        >
          {children}
        </Box>
      </VStack>
    </Layout>
  );
}
