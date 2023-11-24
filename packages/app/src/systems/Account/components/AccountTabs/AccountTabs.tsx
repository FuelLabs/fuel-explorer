'use client';
import type { BaseProps } from '@fuels/ui';
import { IconChecklist, IconCodeAsterix, IconCoins } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { NavigationTab } from '~/systems/Core/components/NavigationTab/NavigationTab';

type AccountTabsProps = BaseProps<{
  isLoading?: boolean;
  accountId?: string;
  isPredicate?: boolean;
}>;

export function AccountTabs({
  accountId,
  isPredicate,
  isLoading,
  ...props
}: AccountTabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const defaultValue = useMemo(() => {
    if (pathname.includes('transactions')) return 'transactions';
    if (pathname.includes('predicate')) return 'predicate';
    return 'assets';
  }, [pathname]);

  return (
    <NavigationTab
      {...props}
      defaultValue={defaultValue}
      value={defaultValue}
      items={[
        {
          icon: IconCoins,
          value: 'assets',
          label: 'Assets',
          disabled: isLoading,
          onClick: () => router.push(`/account2/${accountId}/assets`),
        },
        {
          icon: IconChecklist,
          value: 'transactions',
          label: 'Transactions',
          disabled: isLoading,
          onClick: () => router.push(`/account2/${accountId}/transactions`),
        },
        {
          icon: IconCodeAsterix,
          value: 'predicate',
          label: 'Predicate',
          onClick: () => router.push(`/account2/${accountId}/predicate`),
          disabled: !isPredicate || isLoading,
        },
      ]}
    />
  );
}
