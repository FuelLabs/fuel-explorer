'use client';

import type { ContractItemFragment } from '@fuel-explorer/graphql';
import type { BaseProps } from '@fuels/ui';
import { Address, VStack, cx, useBreakpoints } from '@fuels/ui';
import { IconChecklist, IconCodeAsterix, IconCoins } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { NavigationTab } from '~/systems/Core/components/NavigationTab/NavigationTab';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';

type ContractTitleProps = BaseProps<{
  contract: ContractItemFragment;
}>;

export function ContractTitle({
  contract,
  className,
  ...props
}: ContractTitleProps) {
  const { isLaptop } = useBreakpoints();
  const router = useRouter();
  const pathname = usePathname();
  const defaultValue = useMemo(() => {
    if (pathname.includes('code')) return 'code';
    return 'assets';
  }, [pathname]);

  return (
    <VStack {...props} className={cx('gap-4', className)}>
      <PageTitle icon={<IconChecklist size={24} stroke={1.2} />}>
        Contract
        <Address value={contract?.id} full={isLaptop} fixed="b256" />
      </PageTitle>
      <NavigationTab
        defaultValue={defaultValue}
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
    </VStack>
  );
}
