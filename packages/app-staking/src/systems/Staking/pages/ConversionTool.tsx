import { Button, HStack, VStack } from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS, FuelToken, TOKENS } from 'app-commons';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Routes } from '~staking/routes';
import { PendingTransactionsWatcher } from '~staking/systems/Core/components/PendingTransactionsWatcher/PendingTransactionsWatcher';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';
import { useTokenBalance } from '~staking/systems/Staking/services/useTokenBalance';
import { stakingTxDialogStore } from '~staking/systems/Staking/store/stakingTxDialogStore';
import { StakingDialogs } from '../components/StakingDialogs/StakingDialogs';
import { LiquidCard } from '../components/TokenManager/LiquidCard';
import { TokenGrant } from '../components/TokenManager/TokenGrant';
import { TokenRelease } from '../components/TokenManager/TokenRelease';

const {
  token: v1Token,
  symbol: v1Symbol,
  decimals: v1Decimals,
} = TOKENS[FuelToken.V1];
const {
  token: v2Token,
  symbol: v2Symbol,
  decimals: v2Decimals,
} = TOKENS[FuelToken.V2];

export const ConversionTool = () => {
  const { address } = useAccount();
  const navigate = useNavigate();

  const { data: tokens } = useTokenBalance(v1Token, address);
  const { data: vestingContractV1Balance } = useTokenBalance(
    CURRENT_NETWORK_CONTRACTS.FUEL_V2_TOKEN,
    CURRENT_NETWORK_CONTRACTS.FUEL_TOKEN_MIGRATOR,
  );
  const tokenMigratorHasFuelTokens =
    vestingContractV1Balance && vestingContractV1Balance > 0n;
  const { amount: balance } = useFormatBalance(tokens, v1Decimals);
  const isConvertible = tokenMigratorHasFuelTokens && !balance.isZero();

  return (
    <div>
      <HStack
        direction={{
          initial: 'column',
          md: 'row',
        }}
        justify="between"
        className="mt-5"
      >
        <LiquidCard
          version={'V1'}
          token={v1Token}
          symbol={v1Symbol}
          decimals={v1Decimals}
          account={address}
          actionEl={
            <Button
              variant="solid"
              color="green"
              size="1"
              onClick={() =>
                stakingTxDialogStore.send({
                  type: 'open',
                  name: 'TxConvert',
                  data: address,
                })
              }
              disabled={!isConvertible}
            >
              Upgrade to FUEL
            </Button>
          }
        />
        <LiquidCard
          version={'FUEL'}
          token={v2Token}
          symbol={v2Symbol}
          decimals={v2Decimals}
          account={address}
          actionEl={
            <Button
              variant="outline"
              color="gray"
              size="2"
              className="mobile:max-tablet:hidden"
              // @TODO: Update after mergin with routing changes
              onClick={() => navigate(Routes.stakingL1())}
            >
              Go to Staking
            </Button>
          }
        />
      </HStack>

      <VStack className="mt-16 gap-16">
        <TokenGrant account={address} />
        <TokenRelease account={address} />
      </VStack>
      <PendingTransactionsWatcher />
      <StakingDialogs />
    </div>
  );
};
