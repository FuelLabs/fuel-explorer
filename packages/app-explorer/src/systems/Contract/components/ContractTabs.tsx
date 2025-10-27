import type { BaseProps } from '@fuels/ui';
import {
  IconChecklist,
  IconCodeAsterix,
  IconCoins,
  IconDatabase,
} from '@tabler/icons-react';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Routes } from '~/routes';
import { NavigationTab } from '~/systems/Core/components/NavigationTab/NavigationTab';

type ContractTabsProps = BaseProps<{
  contractId: string;
}>;

export function ContractTabs({ contractId }: ContractTabsProps) {
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
          label: 'Minted Assets',
          icon: IconDatabase,
        },
        {
          value: 'assets',
          label: 'Assets',
          icon: IconCoins,
        },
        {
          value: 'transactions',
          label: 'Transactions',
          icon: IconChecklist,
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
