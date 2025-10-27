import type { GQLAsset } from '@fuel-explorer/graphql';
import type { HStackProps } from '@fuels/ui';
import {
  Badge,
  Copyable,
  HStack,
  IconRosetteDiscountCheck,
  Link,
  Text,
  Tooltip,
} from '@fuels/ui';
import { IconAlertOctagon } from '@tabler/icons-react';
import { useMemo } from 'react';
import { Routes } from '~/routes';
import { useNFT } from '~/systems/Asset/hooks/useNFT';
import type { TxIconType } from '~/systems/Transaction/types';

type AssetItemProps = HStackProps & {
  assetId: string;
  prefix?: string;
  linkContract?: boolean;
  isLoading?: boolean;
  txIconTypeFallback?: TxIconType;
  asset?: Omit<GQLAsset, '__typename'>;
};

export function AssetSymbol({ assetId, asset, linkContract }: AssetItemProps) {
  if (!asset) return null;

  const { data: nft } = useNFT({
    contractId: asset?.contractId,
    assetId: asset?.assetId,
  });

  const name = useMemo<string | null>(() => {
    if (nft?.name) {
      return `${nft.symbol} (${asset.name})`;
    }
    if (asset?.symbol) return asset.symbol;
    if (asset?.name) return asset.name;

    return null;
  }, [asset?.symbol, asset?.name, nft?.name, nft?.symbol]);

  return (
    <HStack gap="1">
      {name ? (
        <>
          {!!asset.contractId && !linkContract && (
            <Link
              href={Routes.contractMintedAssets(asset.contractId)}
              className="font-mono text-sm"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {name}
            </Link>
          )}
          {(!asset.contractId || linkContract) && (
            <Text className="font-normal text-sm text-secondary font-mono">
              {name}
            </Text>
          )}
          {asset?.icon && (
            <Tooltip content="Verified Asset">
              <div className="mx-1">
                <IconRosetteDiscountCheck size={18} color="#0084C2" />
              </div>
            </Tooltip>
          )}
          {asset?.suspicious && (
            <Tooltip content="This asset is flagged as suspicious. It may be mimicking another asset. Proceed with caution.">
              <div className="mx-1">
                <IconAlertOctagon size={16} color="orange" />
              </div>
            </Tooltip>
          )}
          {nft?.nft && (
            <Badge variant="ghost" color="green" size="1">
              NFT
            </Badge>
          )}
        </>
      ) : (
        <>
          <Copyable value={assetId}>
            <Link
              href={
                asset.contractId
                  ? Routes.contractMintedAssets(asset.contractId)
                  : undefined
              }
              className="font-mono text-sm text-muted"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Unknown Asset
            </Link>
          </Copyable>
          {nft?.nft && (
            <Badge variant="ghost" color="green" size="1">
              NFT
            </Badge>
          )}
        </>
      )}
    </HStack>
  );
}
