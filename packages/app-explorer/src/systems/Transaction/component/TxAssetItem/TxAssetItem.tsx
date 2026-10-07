import { IconArrowDown, IconArrowUp, useBreakpoints } from '@fuels/ui';
import { bn } from 'fuels';
import type { BN } from 'fuels';
import { useTranslation } from 'react-i18next';

import { useAsset } from '~/systems/Asset/hooks/useAsset';

import { formatZeroUnits, useFuelAsset } from 'app-commons';
import { TxIcon } from '../TxIcon/TxIcon';
import { TxItem } from '../TxItem/TxItem';

export type TxAssetItemProps = {
  assetId: string;
  amountIn: BN;
  amountOut: BN;
  className?: string;
};

const ICON_SIZE = 40;

export function TxAssetItem({
  className,
  assetId,
  amountIn,
  amountOut,
}: TxAssetItemProps) {
  const { t } = useTranslation();
  const asset = useAsset(assetId);
  const { isMobile } = useBreakpoints();
  const fuelAsset = useFuelAsset(asset);
  if (!asset) return null;

  const format = (amount: BN) =>
    fuelAsset?.decimals
      ? bn(amount).format({
          precision: isMobile ? 3 : undefined,
          units: fuelAsset.decimals,
        })
      : formatZeroUnits(amount);

  return (
    <TxItem
      label={t('tx.asset')}
      className={className}
      trailing={
        <div className="flex flex-col gap-1 text-[14px] tablet:items-end">
          <span className="inline-flex items-center gap-1">
            <IconArrowUp
              aria-hidden
              size={16}
              className="text-[var(--fuel-brand-text)]"
            />
            {format(amountIn)} {asset.symbol}
          </span>
          <span className="inline-flex items-center gap-1">
            <IconArrowDown
              aria-hidden
              size={16}
              className="text-[var(--red-10)]"
            />
            {format(amountOut)} {asset.symbol}
          </span>
        </div>
      }
    >
      <div className="flex items-center gap-4">
        {asset?.icon ? (
          <img
            src={asset.icon as string}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt={asset.name}
            className="rounded-full"
          />
        ) : (
          <TxIcon type="Mint" status="Submitted" />
        )}
        <div className="flex min-w-0 flex-col">
          <span className="font-medium text-heading">{asset.name}</span>
          <span className="truncate font-mono text-[12px] text-[var(--fuel-element-low-em)]">
            {assetId}
          </span>
        </div>
      </div>
    </TxItem>
  );
}
