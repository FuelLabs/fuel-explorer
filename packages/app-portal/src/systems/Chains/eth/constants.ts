import type { BridgeAsset } from '~/systems/Bridge';

import { ethLogoSrc } from './utils';

export const AssetList: BridgeAsset[] = [
  {
    address: undefined,
    symbol: 'ETH',
    image: ethLogoSrc,
    decimals: 18,
  },
];
