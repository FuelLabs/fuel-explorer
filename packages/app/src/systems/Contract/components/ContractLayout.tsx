'use client';

import type { ContractItemFragment } from '@fuel-explorer/graphql';
import { Address, Box, VStack, useBreakpoints } from '@fuels/ui';
import { IconChecklist, IconCoins, IconCodeAsterix } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { NavigationTab } from '~/systems/Core/components/NavigationTab/NavigationTab';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';

export function ContractLayout({
  children,
  contract,
}: {
  contract: ContractItemFragment;
  children: React.ReactNode;
}) {
  const { isLaptop } = useBreakpoints();
  const router = useRouter();
  const pathname = usePathname();
  const defaultValue = useMemo(() => {
    if (pathname.includes('code')) return 'code';
    return 'assets';
  }, [pathname]);

  return (
    <Layout>
      <VStack className="gap-4 laptop:gap-8">
        <PageTitle
          icon={<IconChecklist size={24} stroke={1.2} />}
          className="border-b-gray-3"
        >
          Contract
          <Address value={contract?.id} full={isLaptop} fixed="b256" />
        </PageTitle>
        <NavigationTab
          defaultValue={defaultValue}
          value={defaultValue}
          items={[
            {
              value: 'assets',
              label: 'Assets',
              icon: IconCoins,
              onClick: () => router.push(`/contract/${contract?.id}`),
            },
            {
              value: 'code',
              label: 'Source Code',
              icon: IconCodeAsterix,
              onClick: () => router.push(`/contract/${contract?.id}/code`),
            },
          ]}
        />
        <Box as="section">{children}</Box>
      </VStack>
    </Layout>
  );
}
