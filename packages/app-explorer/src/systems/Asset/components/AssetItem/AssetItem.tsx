import type { HStackProps } from "@fuels/ui";
import {
  Box,
  Copyable,
  Flex,
  HStack,
  LoadingBox,
  LoadingWrapper,
  Text,
  Tooltip,
  shortAddress,
} from "@fuels/ui";
import Image from "next/image";
import { TxIcon } from "~/systems/Transaction/component/TxIcon/TxIcon";

import { useAsset } from "../../hooks/useAsset";

const ICON_SIZE = 38;

type AssetItemProps = HStackProps & {
  assetId: string;
  prefix?: string;
  isLoading?: boolean;
};

export function AssetItem({
  prefix,
  assetId,
  children,
  isLoading,
  ...props
}: AssetItemProps) {
  const asset = useAsset(assetId);
  return (
    <HStack {...props} align="center">
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<LoadingBox className="w-10 h-10 rounded-full" />}
        regularEl={
          asset?.icon ? (
            <Flex className="w-10 h-10 items-center justify-center">
              <Image
                src={asset.icon as string}
                width={ICON_SIZE}
                height={ICON_SIZE}
                alt={asset.name}
              />
            </Flex>
          ) : (
            <TxIcon type="Mint" status="Submitted" />
          )
        }
      />
      <Box>
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-40 h-6" />}
          regularEl={
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
          }
        />
        {children}
      </Box>
    </HStack>
  );
}
