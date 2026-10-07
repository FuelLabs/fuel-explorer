import { Tooltip } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';

import { useAnimatedCounter } from '~staking/systems/Core/hooks/useAnimatedCounter';
import { formatAnimatedBalance } from '~staking/systems/Core/utils/formatAnimatedBalance';
import { useFormatBalance } from '../../../Core/hooks/useFormatBalance';
import { useTokenBalance } from '../../services/useTokenBalance';
type LiquidCardProps = {
  version: string;
  decimals: number;
  symbol: string;
  token: Address;
  account: Address | undefined;
  actionEl?: React.ReactNode;
};

// One figure cell, like AmountCard. The parent frame draws the 1px lines.
export const LiquidCard = ({
  version,
  symbol,
  token,
  decimals,
  account,
  actionEl,
}: LiquidCardProps) => {
  const { t } = useTranslation();
  const { data: tokens, error } = useTokenBalance(token, account);
  const { formatted, original } = useFormatBalance(tokens, decimals);

  const tokensRef = useAnimatedCounter({
    to: formatted.display,
    format: (value) => {
      return formatAnimatedBalance({
        value,
        formatted,
      });
    },
  });

  if (error) {
    return (
      <div className="fuel-edge flex min-w-0 items-center gap-3 px-6 py-5 tablet:px-10">
        <span
          aria-hidden
          className="size-2 shrink-0 border border-[var(--red-10)] bg-[var(--red-10)]"
        />
        <p
          role="alert"
          className="m-0 text-[14px] leading-[18px] text-[var(--red-11)]"
        >
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="fuel-edge flex min-w-0 flex-col justify-between gap-6 px-6 py-5 tablet:px-10">
      <span className="fuel-label">
        {t('staking.upgrade.liquid', { version })}
      </span>
      <div className="flex min-w-0 items-end justify-between gap-3">
        <div className="flex min-w-0 items-baseline gap-2">
          <Tooltip content={`${original.display} ${symbol}`} delayDuration={0}>
            <span
              ref={tokensRef}
              className="fuel-stat-sm overflow-hidden text-ellipsis whitespace-nowrap"
            >
              0
            </span>
          </Tooltip>
          <span className="fuel-label">{symbol}</span>
        </div>
        {actionEl || null}
      </div>
    </div>
  );
};
