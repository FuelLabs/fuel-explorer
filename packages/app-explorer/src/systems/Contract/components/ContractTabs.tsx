import type { BaseProps } from '@fuels/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Routes } from '~/routes';
import { NavigationTab } from '~/systems/Core/components/NavigationTab/NavigationTab';

type ContractTabsProps = BaseProps<{
  contractId: string;
}>;

export function ContractTabs({ contractId }: ContractTabsProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const defaultValue = useMemo(() => {
    if (pathname.includes('code')) return 'code';
    if (pathname.includes('minted-assets')) return 'minted-assets';
    if (pathname.includes('transactions')) return 'transactions';
    return 'assets';
  }, [pathname]);

  return (
    <NavigationTab
      className="mb-2"
      defaultValue={defaultValue}
      value={defaultValue}
      renderTab={(children, item) => (
        <Link to={Routes.contract(contractId, item.value)}>{children}</Link>
      )}
      items={[
        {
          value: 'minted-assets',
          label: t('contract.tabs.minted_assets'),
        },
        {
          value: 'assets',
          label: t('contract.tabs.assets'),
        },
        {
          value: 'transactions',
          label: t('contract.tabs.transactions'),
        },
        {
          value: 'code',
          label: t('contract.tabs.source_code'),
        },
      ]}
    />
  );
}
