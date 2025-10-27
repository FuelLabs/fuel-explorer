import { ContractMintedAssetList } from './ContractMintedAssetList';

export function ContractMintedAssetsLoader() {
  const mintedAssets = {
    nodes: [{ assetId: '0x00' }, { assetId: '0x01' }],
    pageInfo: null,
  };
  return (
    <ContractMintedAssetList
      contractId="0x"
      mintedAssets={mintedAssets as any}
      isLoading
    />
  );
}
