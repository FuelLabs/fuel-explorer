import type { GQLAsset } from '@fuel-explorer/graphql';
import type { HStackProps } from '@fuels/ui';
import {
  Copyable,
  HStack,
  IconRosetteDiscountCheck,
  Link,
  Text,
  Tooltip,
} from '@fuels/ui';
import { IconAlertOctagon } from '@fuels/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes } from '~/routes';
import { AssetNftTag } from '~/systems/Asset/components/AssetItem/AssetNftTag';
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
  const { t } = useTranslation();
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
            <Text className="font-normal text-sm text-[var(--fuel-element-low-em)] font-mono">
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
              <div className="mx-1">
                <IconAlertOctagon size={16} className="text-[var(--red-10)]" />
              </div>
            </Tooltip>
          )}
          {nft?.nft && <AssetNftTag />}
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
              className="font-mono text-sm text-[var(--fuel-element-low-em)]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {t('asset.unknown')}
            </Link>
          </Copyable>
          {nft?.nft && <AssetNftTag />}
        </>
      )}
    </HStack>
  );
}
