import { HStack } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { Outlet, useLocation } from 'react-router-dom';
import { VerifySelectedChainDialog } from '~/systems/Core/components/VerifySelectedChainDialog';
import { AprBadge } from '~staking/systems/Staking/components/AprBadge/AprBadge';
import { StakingTabs } from '~staking/systems/Staking/components/StakingTabs/StakingTabs';

export default function StakingLayout() {
  const location = useLocation();

  // Check if we're on the Ethereum staking tab (L1)
  const isEthereumStaking = location.pathname.includes('/on-ethereum');

  return (
    <div>
      <VerifySelectedChainDialog />
      <HStack justify="between">
        <PageTitle
          title={
            <HStack align="center">
              Stake
              {isEthereumStaking && <AprBadge className="ml-2" />}
            </HStack>
          }
          subtitle="Help secure the FUEL network by delegating your tokens to Fuel validators."
        />
      </HStack>
      <StakingTabs />
      <Outlet />
    </div>
  );
}
