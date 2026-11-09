import type { BaseProps } from '@fuels/ui';
import { Address } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';

type ContractMintedAssetItemProps = BaseProps<{
  mintedAsset: any;
  isLoading?: boolean;
}>;

export function ContractMintedAssetItem({
  mintedAsset,
  isLoading,
  className,
}: ContractMintedAssetItemProps) {
  const { t } = useTranslation();
  const assetId = mintedAsset.assetId;
  const asset = mintedAsset;

  return (
    <div
      className={`fuel-hover-fill flex min-h-16 items-center border-t border-[var(--fuel-border)] px-4 py-3 first:border-t-0 ${className ?? ''}`}
    >
      <AssetItem assetId={assetId} isLoading={isLoading} asset={asset}>
        <Address
          value={assetId}
          prefix={t('tx.id_prefix')}
          isLoading={isLoading}
        />
      </AssetItem>
    </div>
  );
}
