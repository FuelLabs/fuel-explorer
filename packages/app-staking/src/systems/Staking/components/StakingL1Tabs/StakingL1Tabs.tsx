import { IconBuildingBank, IconHistory, IconTableOptions } from '@fuels/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Routes } from '~staking/routes';
import { NavigationTab } from '~staking/systems/Core/components/NavigationTab/NavigationTab';

export function StakingL1Tabs() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const defaultValue = useMemo(() => {
    if (pathname.includes('/on-ethereum/validators')) return 'validators';
    if (pathname.includes('/on-ethereum/transactions')) return 'transactions';
    if (
      pathname.includes('/on-ethereum/positions') ||
      pathname === '/staking/on-ethereum'
    )
      return 'positions';
    return 'positions';
  }, [pathname]);

  return (
    <NavigationTab
      className="mb-8"
      defaultValue={defaultValue}
      value={defaultValue}
      renderTab={(children, item) => {
        const routeMap = {
          positions: Routes.stakingL1CurrentPositions(),
          validators: Routes.stakingL1Validators(),
          transactions: Routes.stakingL1Transactions(),
        };
        const href = routeMap[item.value as keyof typeof routeMap];
        return <Link to={href}>{children}</Link>;
      }}
      items={[
        {
          value: 'positions',
          label: t('staking.positions'),
          icon: IconTableOptions,
        },
        {
          value: 'validators',
          label: t('staking.validators'),
          icon: IconBuildingBank,
        },
        {
          value: 'transactions',
          label: t('staking.transactions'),
          icon: IconHistory,
        },
      ]}
    />
  );
}
