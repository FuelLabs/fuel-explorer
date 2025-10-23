import { Box, Button, VStack } from '@fuels/ui';
import { SHOW_CONVERT_BUTTON, TOKENS } from 'app-commons';
import { FuelToken } from 'app-commons';

import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { AccountButton } from '~staking/systems/Core/components/AccountButton/AccountButton';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';
import { ClaimV2Button } from '~staking/systems/Faucet/ClaimV2';
import { StakingDialogs } from '../components/StakingDialogs';
import { StakingL1Tabs } from '../components/StakingL1Tabs/StakingL1Tabs';
import { Balance } from '../containers/Balance';
import { DelegatedPositions } from '../containers/DelegatedPositions';
import { TransactionHistory } from '../containers/TransactionHistory/TransactionHistory';
import { ValidatorsList } from '../containers/ValidatorsList';
import { useVesting } from '../hooks/useVesting';
import { useTokenBalance } from '../services/useTokenBalance';
import { useVestingReleases } from '../services/useVestingReleases';

const v1 = TOKENS[FuelToken.V1];

export const StakingPage = () => {
  const { address } = useAccount();
  const { data: releases } = useVestingReleases(address);
  const totalGrant = useFormatBalance(releases?.amount, v1.decimals);
  const { vestingTotalBalance } = useVesting({
    account: address,
  });
  const { data: v1TokenBalance } = useTokenBalance(v1.token, address);
  const hasV1Involvement = useMemo(
    () =>
      !!(
        totalGrant.amount.gt(0) ||
        vestingTotalBalance.amount.gt(0) ||
        (v1TokenBalance && v1TokenBalance > 0n)
      ),
    [totalGrant.amount, vestingTotalBalance.amount, v1TokenBalance],
  );
  const { pathname } = useLocation();

  const activeTab = useMemo(() => {
    if (pathname.includes('validators')) {
      return 'validators';
    }
    if (pathname.includes('transactions')) {
      return 'transactions';
    }
    return 'positions';
  }, [pathname]);

  return (
    <Box>
      <div className="flex flex-col gap-2 mb-4 tablet:flex-row tablet:justify-end tablet:items-center">
        <ClaimV2Button />
        {hasV1Involvement && SHOW_CONVERT_BUTTON === 'true' && (
          <Link to="/upgrade" className="tablet:w-auto w-full">
            <Button
              variant="outline"
              color="gray"
              className="laptop:w-auto w-full"
            >
              Upgrade your Fuel V1 Tokens
            </Button>
          </Link>
        )}
        <AccountButton />
      </div>
      <Balance />
      <VStack className="gap-0 mt-16">
        <StakingL1Tabs />
        {activeTab === 'positions' && <DelegatedPositions />}
        {activeTab === 'validators' && <ValidatorsList />}
        {activeTab === 'transactions' && <TransactionHistory />}
      </VStack>
      <StakingDialogs />
    </Box>
  );
};
