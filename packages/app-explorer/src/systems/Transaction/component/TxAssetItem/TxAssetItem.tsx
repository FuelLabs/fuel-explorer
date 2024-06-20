import type { CardProps } from '@fuels/ui';
import { Card, EntityItem, HStack, Text, cx, useBreakpoints } from '@fuels/ui';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { bn } from 'fuels';
import type { BN } from 'fuels';
import Image from 'next/image';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { useFuelAsset } from '~/systems/Asset/hooks/useFuelAsset';
import { formatZeroUnits } from '~/systems/Core/utils/format';

import { TxIcon } from '../TxIcon/TxIcon';

export type TxAssetItemProps = CardProps & {
  assetId: string;
  amountIn: BN;
  amountOut: BN;
};

const ICON_SIZE = 40;

export function TxAssetItem({
  className,
  assetId,
  amountIn,
  amountOut,
  ...props
}: TxAssetItemProps) {
  const asset = useAsset(assetId);
  const { isMobile } = useBreakpoints();
  const fuelAsset = useFuelAsset(asset);
  if (!asset) return null;

  return (
    <Card {...props} className={cx('gap-2 pb-2', className)}>
      <EntityItem className="px-4 pb-4 border-b border-border">
        <EntityItem.Slot>
          {asset?.icon ? (
            <Image
              src={asset.icon as string}
              width={ICON_SIZE}
              height={ICON_SIZE}
              alt={asset.name}
            />
          ) : (
            <TxIcon type="Mint" status="Submitted" />
          )}
        </EntityItem.Slot>
        <EntityItem.Info id={assetId} title={asset.name} />
      </EntityItem>
      <HStack className="px-4 justify-between">
        <Text
          className="text-sm"
          iconColor="text-success"
          leftIcon={IconArrowUp}
        >
          {fuelAsset?.decimals ? (
            <>
              {bn(amountIn).format({
                precision: isMobile ? 3 : undefined,
                units: fuelAsset.decimals,
              })}{' '}
            </>
          ) : (
            formatZeroUnits(amountIn)
          )}
          {asset.symbol}
        </Text>
        <Text
          className="text-sm"
          iconColor="text-error"
          leftIcon={IconArrowDown}
        >
          {fuelAsset?.decimals ? (
            <>
              {bn(amountOut).format({
                precision: isMobile ? 3 : undefined,
                units: fuelAsset.decimals,
              })}{' '}
            </>
          ) : (
            formatZeroUnits(amountOut)
          )}
          {asset.symbol}
        </Text>
      </HStack>
    </Card>
  );
}
