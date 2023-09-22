import type { CardProps } from '@fuel-explorer/ui';
import { Text, Card, EntityItem, HStack, cx } from '@fuel-explorer/ui';
import { resolveIconPath, assets } from '@fuels/assets';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { bn } from 'fuels';
import type { BN } from 'fuels';
import Image from 'next/image';
import { useMemo } from 'react';

export type TxAssetItemProps = CardProps & {
  assetId: string;
  amountIn: BN;
  amountOut: BN;
};

const ASSET_LIST = resolveIconPath('/assets', assets);
const ICON_SIZE = 40;

export function TxAssetItem({
  className,
  assetId,
  amountIn,
  amountOut,
  ...props
}: TxAssetItemProps) {
  const asset = useMemo(
    () => ASSET_LIST.find((i) => i.assetId === assetId),
    [assetId],
  );
  if (!asset) {
    throw new Error(`Asset not found: ${assetId}`);
  }
  return (
    <Card {...props} className={cx('gap-2 pb-2', className)}>
      <EntityItem className="px-4 pb-4 border-b border-border">
        <EntityItem.Slot>
          <Image
            alt={asset.name}
            height={ICON_SIZE}
            src={asset.icon as string}
            width={ICON_SIZE}
          />
        </EntityItem.Slot>
        <EntityItem.Info id={asset.assetId} title={asset.name} />
      </EntityItem>
      <HStack className="px-4 justify-between">
        <Text className="text-sm" iconColor="text-brand" leftIcon={IconArrowUp}>
          {bn(amountIn).format({ units: 4 })} {asset.symbol}
        </Text>
        <Text
          className="text-sm"
          iconColor="text-red-9"
          leftIcon={IconArrowDown}
        >
          {bn(amountOut).format({ units: 4 })} {asset.symbol}
        </Text>
      </HStack>
    </Card>
  );
}
