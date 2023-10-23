import type { CardProps } from '@fuels/ui';
import { Text, Card, EntityItem, HStack, cx } from '@fuels/ui';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { bn } from 'fuels';
import type { BN } from 'fuels';
import Image from 'next/image';
import { useMemo } from 'react';
import { findAssetById } from '~/systems/Core/utils/asset';

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
  const asset = useMemo(() => findAssetById(assetId), [assetId]);
  const assetName = asset?.name ?? 'Unknown';
  const assetSymbol = asset?.symbol ?? null;
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
        <EntityItem.Info id={assetId} title={assetName} />
      </EntityItem>
      <HStack className="px-4 justify-between">
        <Text
          className="text-sm"
          iconColor="text-success"
          leftIcon={IconArrowUp}
        >
          {bn(amountIn).format()} {assetSymbol}
        </Text>
        <Text
          className="text-sm"
          iconColor="text-error"
          leftIcon={IconArrowDown}
        >
          {bn(amountOut).format()} {assetSymbol}
        </Text>
      </HStack>
    </Card>
  );
}
