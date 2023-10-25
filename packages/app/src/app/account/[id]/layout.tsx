import { Address, Box, VStack } from '@fuels/ui';
import { IconHash } from '@tabler/icons-react';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';

export default function AccountLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <Layout>
      <VStack>
        <PageTitle icon={<IconHash size={20} stroke={1.2} />}>
          Account
          <Address full value={id} />
        </PageTitle>
        <AccountTabs accountId={id} />
        <Box as="section" className="mt-10">
          {children}
        </Box>
      </VStack>
    </Layout>
  );
}
