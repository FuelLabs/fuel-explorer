import { ContractAssetList } from './ContractAssetList';

export function ContractAssetsLoader() {
  const balances = [
    { node: { assetId: '0x00', amount: '1000' }, cursor: '1' },
    { node: { assetId: '0x01', amount: '2000' }, cursor: '2' },
  ];
  return <ContractAssetList balances={balances as any} isLoading />;
}
