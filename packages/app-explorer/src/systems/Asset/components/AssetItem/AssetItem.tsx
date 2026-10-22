import type { GQLAsset } from '@fuel-explorer/graphql';
import type { HStackProps } from '@fuels/ui';
import {
  Address,
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
import { IconAlertOctagon } from '@fuels/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Routes } from '~/routes';
import { TxContractIcon } from '~/systems/Transaction/component/TxContractIcon/TxContractIcon';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';
import type { TxIconType } from '~/systems/Transaction/types';
import { useNFT } from '../../hooks/useNFT';
import { AssetNftTag } from './AssetNftTag';

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
  const { t } = useTranslation();
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
                <Text className="font-normal text-sm text-[var(--fuel-element-low-em)] font-mono">
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
                    <Text className="font-normal text-sm text-heading font-mono">
                      {name}
                    </Text>
                  )}
                  {asset?.icon && (
                    <Tooltip content={t('asset.verified')}>
                      <div className="mx-1">
                        <IconRosetteDiscountCheck
                          size={18}
                          className="text-[var(--fuel-brand-text)]"
                        />
                      </div>
                    </Tooltip>
                  )}
                  {asset?.suspicious && (
                    <Tooltip content={t('asset.suspicious')}>
                      <span className="mx-1 inline-flex items-center gap-1 text-xs text-[var(--fuel-danger-text)]">
                        <IconAlertOctagon size={16} aria-hidden />
                        {t('asset.suspicious_badge')}
                      </span>
                    </Tooltip>
                  )}
                  {nft?.nft && <AssetNftTag />}
                  <Copyable value={asset.assetId || ''} iconSize={16} />
                </>
              ) : (
                <>
                  <Address
                    value={assetId}
                    className="text-[var(--fuel-element-low-em)] font-mono"
                  >
                    {nft?.nft && <AssetNftTag />}
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
