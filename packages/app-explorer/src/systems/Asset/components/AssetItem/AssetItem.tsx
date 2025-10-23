import type { GQLAsset } from '@fuel-explorer/graphql';
import type { HStackProps } from '@fuels/ui';
import {
  Address,
  Badge,
  Box,
  Copyable,
  Flex,
  HStack,
  IconRosetteDiscountCheck,
  LoadingBox,
  LoadingWrapper,
  Text,
  Tooltip,
} from '@fuels/ui';
import { IconAlertOctagon } from '@tabler/icons-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Routes } from '~/routes';
import { TxContractIcon } from '~/systems/Transaction/component/TxContractIcon/TxContractIcon';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';
import type { TxIconType } from '~/systems/Transaction/types';
import { useNFT } from '../../hooks/useNFT';

const ICON_SIZE = 38;

type AssetItemProps = HStackProps & {
  assetId: string;
  prefix?: string;
  isLoading?: boolean;
  txIconTypeFallback?: TxIconType;
  asset: Omit<GQLAsset, '__typename'>;
};

export function AssetItem({
  prefix,
  assetId,
  children,
  isLoading,
  txIconTypeFallback,
  asset,
  ...props
}: AssetItemProps) {
  const location = useLocation();
  const isMintedAssetsRoute = location.pathname.includes('minted-assets');
  const { data: nft } = useNFT({
    contractId: asset?.contractId,
    assetId: asset?.assetId,
  });

  const name = useMemo<string | null>(() => {
    if (nft?.name) {
      return `${nft.symbol} (${asset.name})`;
    }
    if (asset.symbol) return asset.symbol;
    if (asset.name) return asset.name;

    return null;
  }, [asset.symbol, asset.name, nft?.name, nft?.symbol]);

  return (
    <HStack {...props} align="center">
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<LoadingBox className="w-10 h-10 rounded-full" />}
        regularEl={
          asset?.icon ? (
            <Flex className="w-10 h-10 items-center justify-center">
              <img
                src={asset.icon as string}
                width={ICON_SIZE}
                height={ICON_SIZE}
                alt={asset.name || ''}
                className="rounded-full"
              />
            </Flex>
          ) : (
            <TxContractIcon contractId={asset.contractId}>
              <TxIcon type={txIconTypeFallback || 'Mint'} status="Submitted" />
            </TxContractIcon>
          )
        }
      />
      <Box className="flex flex-col min-w-0 flex-1">
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-40 h-5" />}
          regularEl={
            <HStack gap="1" className="items-center min-w-0">
              {prefix && (
                <Text className="font-normal text-sm text-secondary font-mono">
                  {prefix}
                </Text>
              )}
              {name ? (
                <>
                  {!!asset.contractId && !isMintedAssetsRoute && (
                    <Link
                      to={Routes.contractMintedAssets(asset.contractId)}
                      className="font-mono text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {name}
                    </Link>
                  )}
                  {(!asset.contractId || isMintedAssetsRoute) && (
                    <Text className="font-normal text-sm text-primary font-mono">
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
                  <Copyable value={asset.assetId || ''} iconSize={16} />
                </>
              ) : (
                <>
                  <Address value={assetId} className="text-gray-11 font-mono">
                    {nft?.nft && (
                      <Badge variant="ghost" color="green" size="1">
                        NFT
                      </Badge>
                    )}
                  </Address>
                </>
              )}
            </HStack>
          }
        />
        {children}
      </Box>
    </HStack>
  );
}
