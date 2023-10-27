import { Box, VStack } from '@fuels/ui';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { Layout } from '~/systems/Core/components/Layout/Layout';

export default function AccountLayout({
  children,
  title,
  params: { id },
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <Layout>
      <VStack>
        {title}
        <AccountTabs accountId={id} />
        <Box as="section" className="mt-10">
          {children}
        </Box>
      </VStack>
    </Layout>
  );
}
