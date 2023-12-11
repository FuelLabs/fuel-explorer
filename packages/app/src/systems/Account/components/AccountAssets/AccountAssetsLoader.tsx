/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseAssetId } from 'fuels';

import { AccountAssets } from './AccountAssets';

export function AccountAssetsLoader() {
  const balances = [{ assetId: BaseAssetId }, { assetId: BaseAssetId }];

  return <AccountAssets isLoading id="0x" balances={balances as any} />;
}
