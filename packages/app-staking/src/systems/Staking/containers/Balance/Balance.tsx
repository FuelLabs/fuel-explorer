import { Button } from '@fuels/ui';
import { FuelToken, L1_DISABLE_WITHDRAW, TOKENS } from 'app-commons';
import { bn } from 'fuels';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import { useVesting } from '~staking/systems/Staking/hooks/useVesting';
import { stakingTxDialogStore } from '~staking/systems/Staking/store/stakingTxDialogStore';
import { useFormatBalance } from '../../../Core/hooks/useFormatBalance';
import { AmountCard } from '../../components/AmountCard/AmountCard';
import { useRewards } from '../../services/useRewards';
import { useSharedSequencerBalance } from '../../services/useSharedSequencerBalance';
import { useTokenBalance } from '../../services/useTokenBalance';
const v2 = TOKENS[FuelToken.V2];
const { symbol, token, decimals } = v2;

export const Balance = () => {
  const { t } = useTranslation();
  const { address, isConnected } = useAccount();
  const { data: tokens } = useTokenBalance(token, address);
  const { data: sequencerBalance } = useSharedSequencerBalance(address);
  const { data: reward } = useRewards(address, {
    select: (rewards) => rewards.total[0],
  });
  const {
    vesting_start: vestingStart,
    vesting_end: vestingEnd,
    vestingTotalBalance,
  } = useVesting({
    account: address,
  });

  const tokenBalance = useFormatBalance(tokens, decimals);

  const fuelSequencerBalance = useMemo(
    () => formatAmount(bn(sequencerBalance?.amount), decimals),
    [sequencerBalance],
  );

  const lockedTokensBalance = useMemo(() => {
    if (!vestingStart || !vestingEnd || vestingTotalBalance.amount.isZero())
      return formatAmount(bn(0), decimals);
    const currentTime = Date.now() / 1000;
    const totalBalance = vestingTotalBalance.amount;
    const totalTime = vestingEnd - vestingStart;
    const timePassed = currentTime - vestingStart;
    if (vestingEnd <= currentTime) return formatAmount(bn(0), decimals);
    const lockedBalance = totalBalance
      .mul(totalTime - timePassed)
      .div(totalTime);
    return formatAmount(lockedBalance, decimals);
  }, [vestingTotalBalance.amount, vestingStart, vestingEnd]);

  const rewardBalance = useMemo(
    // Cosmos API returns decimal strings - truncate to integer for bn
    () =>
      formatAmount(
        bn(Math.floor(Number(reward?.amount ?? 0)).toString()),
        decimals,
      ),
    [reward],
  );

  // The board above already asks a disconnected visitor to connect.
  // Staked FUEL lives in the Ethereum lane cell, so it is not repeated here.
  if (!isConnected) return null;

  // The strip spans the frame cell edge to edge, so its lines join the frame.
  return (
    <div className="grid grid-cols-1 gap-px border-y border-[var(--fuel-line)] bg-[var(--fuel-line)] min-[560px]:grid-cols-2 laptop:grid-cols-3 min-[560px]:[&>:last-child]:col-span-2 laptop:[&>:last-child]:col-span-1">
      <AmountCard
        title={t('staking.balance.ethereum')}
        symbol={symbol}
        infoTooltip={t('staking.balance.ethereum_tip')}
        amount={tokenBalance.amount}
      />
      <AmountCard
        title={t('staking.balance.sequencer')}
        symbol={symbol}
        infoTooltip={t('staking.balance.sequencer_tip')}
        amount={fuelSequencerBalance.amount}
        secondaryTitle={t('staking.balance.vesting')}
        secondaryAmount={
          lockedTokensBalance.amount.isZero()
            ? undefined
            : lockedTokensBalance.amount
        }
        secondaryInfoTooltip={t('staking.balance.vesting_tip')}
        actions={
          L1_DISABLE_WITHDRAW !== 'true' && (
            <Button
              variant="ghost"
              color="gray"
              size="2"
              className="max-h-[30px]"
              disabled={fuelSequencerBalance.amount.isZero()}
              onClick={() =>
                stakingTxDialogStore.send({
                  type: 'open',
                  name: 'TxWithdrawNew',
                  data: undefined,
                })
              }
            >
              {t('staking.balance.withdraw')}
            </Button>
          )
        }
      />
      <AmountCard
        title={t('staking.balance.rewards')}
        symbol={symbol}
        infoTooltip={t('staking.balance.rewards_tip')}
        amount={rewardBalance.amount}
      />
    </div>
  );
};
