import { Button, HStack, Link } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { type ReactNode, Suspense, lazy } from 'react';
import { Routes } from '~staking/routes';
import { AccountButton } from '~staking/systems/Core/components/AccountButton/AccountButton';
import { ConversionToolLoader } from '~staking/systems/Staking/pages/ConversionToolLoader';

const ConversionTool = lazy(
  () => import('~/systems/Staking/screens/ConversionTool'),
);

type UpgradePageProps = { children?: ReactNode };
const UpgradePage = ({ children }: UpgradePageProps) => {
  return (
    <div>
      <PageTitle
        title="Token Manager"
        subtitle="Manage your contributor grant and Fuel token release schedules."
      >
        <HStack
          gap="2"
          justify={{
            initial: 'start',
            md: 'end',
          }}
          wrap="wrap"
          flexGrow="1"
          flexShrink="0"
          className="mb-4"
        >
          <HStack gap="2">
            <Link href={Routes.stakingL1()}>
              <Button variant="outline" color="gray">
                Stake your Fuel Tokens
              </Button>
            </Link>
          </HStack>
          <AccountButton showConnectButton={true} />
        </HStack>
      </PageTitle>
      <Suspense fallback={<ConversionToolLoader />}>
        <ConversionTool />
      </Suspense>
      {children}
    </div>
  );
};

export default UpgradePage;
