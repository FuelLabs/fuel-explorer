import { Copyable, Tooltip } from '@fuels/ui';
import { DECIMAL_FUEL } from 'fuels';
import { useTranslation } from 'react-i18next';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';

export interface BlockItemProps {
  blockId: string;
  totalFee: number;
}

export default function BlockItem({ blockId, totalFee }: BlockItemProps) {
  const { t } = useTranslation();
  const { formatted, original } = useFormatBalance(
    BigInt(totalFee),
    DECIMAL_FUEL,
  );
  return (
    <div className="flex flex-col gap-1">
      <Copyable
        value={blockId}
        className="font-mono font-semibold text-heading text-sm"
      >
        #{blockId}
      </Copyable>
      <Tooltip content={`${original.display} ETH `}>
        <span
          className="w-[7rem] text-ellipsis text-[12px] text-[var(--fuel-element-low-em)]"
          aria-label={t('block.total_fee')}
        >
          {formatted.display} ETH
        </span>
      </Tooltip>
    </div>
  );
}
