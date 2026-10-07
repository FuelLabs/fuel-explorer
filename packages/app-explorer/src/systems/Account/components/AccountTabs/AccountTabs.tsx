import type { BaseProps } from '@fuels/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          value: 'assets',
          label: t('account.tabs.assets'),
        },
        {
          value: 'nfts',
          label: t('account.tabs.nfts'),
        },
        {
          value: 'transactions',
          label: t('account.tabs.transactions'),
        },
        {
          value: 'predicate',
          label: t('account.tabs.predicate'),
          disabled: !isPredicate,
        },
      ]}
    />
  );
}
