'use client';
import type { BaseProps } from '@fuels/ui';
import { IconChecklist, IconCodeAsterix, IconCoins } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Routes } from '~/routes';
import { NavigationTab } from '~/systems/Core/components/NavigationTab/NavigationTab';

type AccountTabsProps = BaseProps<{
  address: string;
  isPredicate?: boolean;
}>;

export function AccountTabs({
  address,
  isPredicate,
  ...props
}: AccountTabsProps) {
  const pathname = usePathname();
  const defaultValue = useMemo(() => {
    if (pathname.includes('transactions')) return 'transactions';
    if (pathname.includes('predicate')) return 'predicate';
    return 'assets';
  }, [pathname]);

  return (
    <NavigationTab
      {...props}
      className="mb-8"
      defaultValue={defaultValue}
      value={defaultValue}
      renderTab={(children, item) => (
        <Link prefetch={true} href={Routes.account(address, item.value)}>
          {children}
        </Link>
      )}
      items={[
        {
          icon: IconCoins,
          value: 'assets',
          label: 'Assets',
        },
        {
          icon: IconChecklist,
          value: 'transactions',
          label: 'Transactions',
        },
        {
          icon: IconCodeAsterix,
          value: 'predicate',
          label: 'Predicate',
          disabled: !isPredicate,
        },
      ]}
    />
  );
}
