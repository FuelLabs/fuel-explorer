import type { HStackProps } from '@fuels/ui';
import { HStack, Text, shortAddress, Copyable, Tooltip, Box } from '@fuels/ui';
import Image from 'next/image';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';

import { useAsset } from '../../hooks/useAsset';

const ICON_SIZE = 38;

type AssetItemProps = HStackProps & {
  assetId: string;
  prefix?: string;
};

export function AssetItem({
  prefix,
  assetId,
  children,
  ...props
}: AssetItemProps) {
  const asset = useAsset(assetId);
  return (
    <HStack {...props} align="center">
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
      <Box>
        <HStack gap="2">
          {prefix && <Text className="font-medium">{prefix}</Text>}
          {asset?.symbol ? (
            <Tooltip content={assetId}>
              <Copyable value={assetId}>
                <Text className="flex items-center gap-2 text-md">
                  {asset?.name}
                  <Text className="mt-px text-muted">{asset.symbol}</Text>
                </Text>
              </Copyable>
            </Tooltip>
          ) : (
            <Tooltip content={assetId}>
              <Copyable value={assetId} className="text-gray-11 font-mono">
                {shortAddress(assetId)}
              </Copyable>
            </Tooltip>
          )}
        </HStack>
        {children}
      </Box>
    </HStack>
  );
}
