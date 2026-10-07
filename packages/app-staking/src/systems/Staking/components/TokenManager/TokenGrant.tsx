import { Button, GridFrame, Tooltip, useToast } from '@fuels/ui';
import { FuelToken, SHOW_CLAIM_BUTTON, TOKENS } from 'app-commons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import { getShortError } from '~staking/systems/Core';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';
import { ViewInExplorer } from '~staking/systems/Core/components/ViewInExplorer/ViewInExplorer';
import { useAnimatedCounter } from '~staking/systems/Core/hooks/useAnimatedCounter';
import { PendingTransactionTypeL1 } from '~staking/systems/Core/hooks/usePendingTransactions';
import { usePendingTransactionsCache } from '~staking/systems/Core/hooks/usePendingTransactionsCache';
import { formatAnimatedBalance } from '~staking/systems/Core/utils/formatAnimatedBalance';
import { useFormatBalance } from '../../../Core/hooks/useFormatBalance';
import { useVesting } from '../../hooks/useVesting';
import { useVestingReleases } from '../../services/useVestingReleases';
import { useVestingUnpaid } from '../../services/useVestingUnpaid';
import { formatTimestamp } from '../../utils/formatTimestamp';
import { StatCell, StatRow } from './StatCell';

type TokenGrantProps = {
  account: Address | undefined;
};
const { token, symbol, decimals } = TOKENS[FuelToken.V1];

export const TokenGrant = ({ account }: TokenGrantProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { getPendingTransaction, addPendingTransaction } =
    usePendingTransactionsCache();

  const { data: unpaid_val } = useVestingUnpaid(account);
  const { data: releases } = useVestingReleases(account);
  const { start, cliff, end, amount, claimed: claimed_val } = releases ?? {};
  const unpaid = useFormatBalance(unpaid_val, decimals);
  const claimed = useFormatBalance(claimed_val, decimals);
  const totalGrant = useFormatBalance(amount, decimals);

  const cachedTx = useMemo(() => {
    return getPendingTransaction(token, PendingTransactionTypeL1.ClaimVesting);
  }, [getPendingTransaction]);
  const {
    handlers: { claim },
    isClaiming,
    isWaitingVestingClaim,
    isConfirmedVestingClaim,
    error,
  } = useVesting({ pendingTx: cachedTx, account });

  const hasUnpaidTokens = amount && amount > 0n;

  const unpaidRef = useAnimatedCounter({
    to: unpaid.formatted.display,
    format: (value) => {
      return formatAnimatedBalance({
        value,
        formatted: unpaid.formatted,
      });
    },
  });
  const grantRef = useAnimatedCounter({
    to: totalGrant.formatted.display,
    format: (value) => {
      return formatAnimatedBalance({ value, formatted: totalGrant.formatted });
    },
  });
  const totalClaimedRef = useAnimatedCounter({
    to: claimed.formatted.display,
    format: (value) => {
      return formatAnimatedBalance({ value, formatted: claimed.formatted });
    },
  });

  const handleClaim = () => {
    const formatted = unpaid.original.display;

    claim({
      options: {
        onSuccess: (hash) => {
          addPendingTransaction({
            hash,
            token,
            symbol,
            formatted,
            type: PendingTransactionTypeL1.ClaimVesting,
            layer: 'l1',
          });
          toast({
            title: t('staking.upgrade.claim_submitted'),
            description: `${formatted} ${symbol}`,
            action: <ViewInExplorer hash={hash} />,
            variant: 'info',
          });
        },
      },
    });
  };

  if (!hasUnpaidTokens || SHOW_CLAIM_BUTTON !== 'true') return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="fuel-label m-0 text-heading">
        {t('staking.upgrade.grant_title')}
      </h2>
      <GridFrame className="grid-cols-1">
        <div className="fuel-edge flex min-w-0 flex-col gap-6 px-6 py-5 tablet:px-10">
          <span className="fuel-label">{t('staking.upgrade.unclaimed')}</span>
          <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center">
            <div className="flex min-w-0 items-baseline gap-2">
              <Tooltip
                content={`${unpaid.formatted.display} ${symbol}`}
                delayDuration={0}
              >
                <span
                  ref={unpaidRef}
                  className="fuel-stat overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  1
                </span>
              </Tooltip>
              <span className="fuel-label">{symbol}</span>
            </div>
            {!unpaid.amount.isZero() && (
              <div className="flex flex-col items-start">
                <Button
                  size="2"
                  isLoading={isClaiming || isWaitingVestingClaim}
                  disabled={isConfirmedVestingClaim}
                  onClick={handleClaim}
                >
                  {t('staking.upgrade.claim')}
                </Button>
                <AnimatedError
                  error={error ? getShortError(error) : undefined}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <StatRow className="border-0 laptop:grid-cols-5">
            <StatCell label={t('staking.upgrade.total_grant')}>
              <Tooltip
                content={`${totalGrant.original.display} ${symbol}`}
                delayDuration={0}
              >
                <span>
                  <span ref={grantRef}>0</span> {symbol}
                </span>
              </Tooltip>
            </StatCell>
            <StatCell label={t('staking.upgrade.total_claimed')}>
              <Tooltip
                content={`${claimed.original.display} ${symbol}`}
                delayDuration={0}
              >
                <span>
                  <span ref={totalClaimedRef}>0</span> {symbol}
                </span>
              </Tooltip>
            </StatCell>
            <StatCell label={t('staking.upgrade.start_date')}>
              {formatTimestamp(start)}
            </StatCell>
            <StatCell label={t('staking.upgrade.cliff_end')}>
              {formatTimestamp(cliff)}
            </StatCell>
            <StatCell label={t('staking.upgrade.release_end')}>
              {formatTimestamp(end)}
            </StatCell>
          </StatRow>
        </div>
      </GridFrame>
    </section>
  );
};
