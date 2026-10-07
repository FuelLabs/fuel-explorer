import { Button, Link } from '@fuels/ui';
import { type ReactNode, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolPageHeader } from '~/systems/Core/components/ToolPage/ToolPageHeader';
import { Routes } from '~staking/routes';
import { AccountButton } from '~staking/systems/Core/components/AccountButton/AccountButton';
import { ConversionToolLoader } from '~staking/systems/Staking/pages/ConversionToolLoader';

const ConversionTool = lazy(
  () => import('~/systems/Staking/screens/ConversionTool'),
);

type UpgradePageProps = { children?: ReactNode };
const UpgradePage = ({ children }: UpgradePageProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <ToolPageHeader
        title={t('core.upgrade.title')}
        actions={
          <>
            <Link href={Routes.stakingL1()}>
              <Button variant="ghost" color="gray">
                {t('core.upgrade.stake_tokens')}
              </Button>
            </Link>
            <AccountButton showConnectButton={true} />
          </>
        }
      />
      <p className="m-0 px-6 pb-6 text-[16px] text-[var(--fuel-element-low-em)] leading-[20px] tracking-[-0.32px] tablet:px-10">
        {t('core.upgrade.subtitle')}
      </p>
      <Suspense fallback={<ConversionToolLoader />}>
        <ConversionTool />
      </Suspense>
      {children}
    </div>
  );
};

export default UpgradePage;
