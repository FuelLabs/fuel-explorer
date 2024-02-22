import assetList from '@fuels/assets';
import type { Asset } from '@fuels/assets';
import {
  ETH_ERC20,
  FUEL_CHAIN,
  FUEL_FUNGIBLE_ASSET_ID,
  FUEL_FUNGIBLE_CONTRACT_ID,
} from 'app-commons';
import { ETH_CHAIN } from '~portal/systems/Chains/config';
import { getContractTokenId } from '~portal/systems/Chains/fuel/utils/contract';

const defaultAssets: Asset[] = [...assetList];

if (ETH_ERC20) {
  defaultAssets.push({
    icon: '',
    name: 'Test Token',
    symbol: 'TKN',
    networks: [
      {
        type: 'ethereum',
        chainId: ETH_CHAIN.id,
        decimals: 18,
        address: ETH_ERC20,
      },
      {
        type: 'fuel',
        chainId: FUEL_CHAIN.id,
        decimals: 9,
        contractId: FUEL_FUNGIBLE_CONTRACT_ID,
        assetId:
          FUEL_FUNGIBLE_ASSET_ID ||
          getContractTokenId(FUEL_FUNGIBLE_CONTRACT_ID as `0x${string}`),
      },
    ],
  });
}

export { defaultAssets };
