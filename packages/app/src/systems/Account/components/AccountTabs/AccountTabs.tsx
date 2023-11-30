'use client';
import type { BaseProps } from '@fuels/ui';
import { IconChecklist, IconCodeAsterix, IconCoins } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { NavigationTab } from '~/systems/Core/components/NavigationTab/NavigationTab';

type AccountTabsProps = BaseProps<{
  isLoading?: boolean;
  address?: string;
  isPredicate?: boolean;
}>;

export function AccountTabs({
  address,
  isPredicate,
  ...props
}: AccountTabsProps) {
  const pathname = usePathname();
  // const router = useRouter();
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
          label: <Link href={`/account/${address}/assets`}>Assets</Link>,
          // disabled: isLoading,
          onClick: () => {}, // router.push(`/account/${address}/assets`),
        },
        {
          icon: IconChecklist,
          value: 'transactions',
          label: (
            <Link href={`/account/${address}/transactions`}>Transactions</Link>
          ),
          // disabled: isLoading,
          onClick: () => {}, // router.push(`/account/${address}/transactions`),
        },
        {
          icon: IconCodeAsterix,
          value: 'predicate',
          // label: 'Predicate',
          label: <Link href={`/account/${address}/predicate`}>Predicate</Link>,
          onClick: () => {}, // router.push(`/account/${address}/predicate`),
          disabled: !isPredicate,
        },
      ]}
    />
  );
}
