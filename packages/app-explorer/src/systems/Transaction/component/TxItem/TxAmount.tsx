import type { BN } from 'fuels';
import type { ComponentProps } from 'react';
import { Amount } from '~/systems/Core/components/Amount/Amount';

type TxAmountProps = Pick<
  ComponentProps<typeof Amount>,
  'assetId' | 'decimals' | 'hideIcon' | 'hideSymbol' | 'asset'
> & {
  value: BN;
  usd?: string | null;
};

export function TxAmount({ usd, ...props }: TxAmountProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <Amount className="text-[16px] text-heading" {...(props as any)} />
      {usd && (
        <span className="text-[13px] text-[var(--fuel-element-low-em)]">
          ({usd})
        </span>
      )}
    </div>
  );
}
