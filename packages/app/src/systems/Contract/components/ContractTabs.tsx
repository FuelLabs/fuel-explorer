'use client';
import type { BaseProps } from '@fuels/ui';
import { IconCodeAsterix, IconCoins } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { NavigationTab } from '~/systems/Core/components/NavigationTab/NavigationTab';

type ContractTabsProps = BaseProps<{
  isLoading?: boolean;
  contractId?: string;
}>;

export function ContractTabs({ contractId, isLoading }: ContractTabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const defaultValue = useMemo(() => {
    if (pathname.includes('code')) return 'code';

    return 'transactions';
  }, [pathname]);

  return (
    <NavigationTab
      defaultValue={defaultValue}
      value={defaultValue}
      items={[
        {
          value: 'assets',
          label: 'Assets',
          icon: IconCoins,
          disabled: isLoading,
          onClick: () => router.push(`/contract/${contractId}/assets`),
        },
        {
          value: 'code',
          label: 'Source Code',
          icon: IconCodeAsterix,
          disabled: isLoading,
          onClick: () => router.push(`/contract/${contractId}/code`),
        },
      ]}
    />
  );
}
