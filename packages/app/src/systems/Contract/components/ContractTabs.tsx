'use client';
import type { BaseProps } from '@fuels/ui';
import { IconCodeAsterix, IconCoins } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { NavigationTab } from '~/systems/Core/components/NavigationTab/NavigationTab';

type ContractTabsProps = BaseProps<{
  contractId?: string;
}>;

export function ContractTabs({ contractId }: ContractTabsProps) {
  const pathname = usePathname();
  const defaultValue = useMemo(() => {
    if (pathname.includes('code')) return 'code';
    return 'assets';
  }, [pathname]);

  return (
    <NavigationTab
      defaultValue={defaultValue}
      value={defaultValue}
      renderTab={(children, item) => (
        <Link href={`/contract/${contractId}/${item.value}`}>{children}</Link>
      )}
      items={[
        {
          value: 'assets',
          label: 'Assets',
          icon: IconCoins,
        },
        {
          value: 'code',
          label: 'Source Code',
          icon: IconCodeAsterix,
        },
      ]}
    />
  );
}
