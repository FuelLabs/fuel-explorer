import { AccountAssets } from './AccountAssets';

export function AccountAssetsLoader() {
  const balances = [{ assetId: '0x00' }, { assetId: '0x00' }];
  return <AccountAssets isLoading id="0x" balances={balances as any} />;
}
