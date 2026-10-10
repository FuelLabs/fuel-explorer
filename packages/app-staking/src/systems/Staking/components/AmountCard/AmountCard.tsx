import { HelperIcon, IconInfoCircle } from '@fuels/ui';
import type { BN } from 'fuels';
import type React from 'react';
import { FormattedAmount } from '~staking/systems/Core/components/FormattedAmount/FormattedAmount';

type AmountCardProps = {
  title: string;
  titleSuffix?: React.ReactNode;
  amount: BN;
  symbol?: string;
  decimals?: number;
  infoTooltip?: string;
  actions?: React.ReactNode;
  secondaryTitle?: string;
  secondaryAmount?: BN;
  secondaryInfoTooltip?: string;
};

// One figure cell. Cells sit in a strip that draws the 1px lines between them.
export function AmountCard({
  title,
  titleSuffix,
  amount,
  symbol,
  decimals = 9,
  infoTooltip,
  actions,
  secondaryAmount,
  secondaryInfoTooltip,
  secondaryTitle,
}: AmountCardProps) {
  return (
    <div className="flex min-w-0 flex-col justify-between gap-6 bg-[var(--fuel-background)] px-6 py-5 tablet:px-10">
      <div className="fuel-label flex items-center gap-2">
        {title}
        {infoTooltip ? (
          <HelperIcon
            message={infoTooltip}
            icon={IconInfoCircle}
            iconSize={16}
          />
        ) : null}
        {titleSuffix}
      </div>
      <div className="flex min-w-0 items-end justify-between gap-3">
        <div className="flex min-w-0 items-baseline gap-2">
          <FormattedAmount
            amount={amount}
            decimals={decimals}
            symbol={symbol}
            textProps={{
              as: 'div',
              className:
                'fuel-stat-sm whitespace-nowrap overflow-hidden text-ellipsis',
            }}
          />
          {symbol && <span className="fuel-label normal-case">{symbol}</span>}
        </div>
        {actions}
      </div>
      {secondaryTitle && secondaryAmount != null && (
        <div className="flex flex-col gap-1">
          <div className="fuel-label flex items-center gap-2">
            {secondaryTitle}
            {secondaryInfoTooltip ? (
              <HelperIcon
                message={secondaryInfoTooltip}
                icon={IconInfoCircle}
                iconSize={16}
              />
            ) : null}
          </div>
          <FormattedAmount
            amount={secondaryAmount}
            decimals={decimals}
            symbol={symbol}
            textProps={{
              as: 'div',
              className:
                'text-[14px] leading-[18px] font-medium tabular-nums whitespace-nowrap overflow-hidden text-ellipsis',
            }}
          />
        </div>
      )}
    </div>
  );
}
