import assetList from '@fuels/assets';
import {
  VITE_ETH_ERC20,
  VITE_FUEL_FUNGIBLE_ASSET_ID,
  VITE_FUEL_FUNGIBLE_CONTRACT_ID,
} from '~/config';
import { ETH_CHAIN, FUEL_CHAIN } from '~/systems/Chains/config';
import { getContractTokenId } from '~/systems/Chains/fuel/utils/contract';

import type { Asset } from '../services/asset';

const defaultAssets: Asset[] = [...assetList];

if (VITE_ETH_ERC20) {
  defaultAssets.push({
    icon: null,
    name: 'Test Token',
    symbol: 'TKN',
    networks: [
      {
        type: 'ethereum',
        chainId: ETH_CHAIN.id,
        decimals: 18,
        address: VITE_ETH_ERC20,
      },
      {
        type: 'fuel',
        chainId: FUEL_CHAIN.id,
        decimals: 9,
        contractId: VITE_FUEL_FUNGIBLE_CONTRACT_ID,
        assetId:
          VITE_FUEL_FUNGIBLE_ASSET_ID ||
          getContractTokenId(VITE_FUEL_FUNGIBLE_CONTRACT_ID as `0x${string}`),
      },
    ],
  });
}

export { defaultAssets };
