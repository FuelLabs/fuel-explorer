import type { BaseProps } from '@fuels/ui';
import {
  IconChecklist,
  IconCodeAsterix,
  IconCoins,
  IconPhoto,
} from '@tabler/icons-react';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const defaultValue = useMemo(() => {
    if (location.pathname.includes('transactions')) return 'transactions';
    if (location.pathname.includes('predicate')) return 'predicate';
    if (location.pathname.includes('nfts')) return 'nfts';
    return 'assets';
  }, [location.pathname]);

  return (
    <NavigationTab
      {...props}
      defaultValue={defaultValue}
      value={defaultValue}
      renderTab={(children, item) => (
        <Link to={`/account/${address}/${item.value}`}>{children}</Link>
      )}
      items={[
        {
          icon: IconCoins,
          value: 'assets',
          label: 'Assets',
        },
        {
          icon: IconPhoto,
          value: 'nfts',
          label: 'NFTs',
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
