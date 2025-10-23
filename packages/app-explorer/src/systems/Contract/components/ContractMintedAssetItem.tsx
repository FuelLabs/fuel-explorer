import type { BaseProps } from '@fuels/ui';
import { Address, Collapsible } from '@fuels/ui';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';

type ContractMintedAssetItemProps = BaseProps<{
  mintedAsset: any;
  isLoading?: boolean;
}>;

export function ContractMintedAssetItem({
  mintedAsset,
  isLoading,
  ...props
}: ContractMintedAssetItemProps) {
  const assetId = mintedAsset.assetId;
  const asset = mintedAsset;

  return (
    <Collapsible {...props} hideIcon className={'min-h-16'}>
      <Collapsible.Header>
        <AssetItem assetId={assetId} isLoading={isLoading} asset={asset}>
          <Address value={assetId} prefix="Id:" isLoading={isLoading} />
        </AssetItem>
      </Collapsible.Header>
    </Collapsible>
  );
}
