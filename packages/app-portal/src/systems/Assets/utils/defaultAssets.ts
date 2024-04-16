import assetList from '@fuels/assets';
import type { Asset } from '@fuels/assets';
import { type BridgeTokenContracts, FUEL_CHAIN } from 'app-commons';
import { ETH_CHAIN } from '~portal/systems/Chains/config';
import { getContractTokenId } from '~portal/systems/Chains/fuel/utils/contract';

const defaultAssets: Asset[] = [...assetList];

export const getDefaultAssets = (
  bridgeTokenContracts?: BridgeTokenContracts,
) => {
  const assets = [...defaultAssets];

  if (bridgeTokenContracts?.ETH_ERC20) {
    assets.push({
      icon: '',
      name: 'Test Token',
      symbol: 'TKN',
      networks: [
        {
          type: 'ethereum',
          chainId: ETH_CHAIN.id,
          decimals: 18,
          address: bridgeTokenContracts.ETH_ERC20,
        },
        {
          type: 'fuel',
          chainId: FUEL_CHAIN.id,
          decimals: 9,
          contractId: bridgeTokenContracts.FUEL_TokenContract,
          assetId:
            bridgeTokenContracts.FUEL_TokenAsset ||
            getContractTokenId(
              bridgeTokenContracts.FUEL_TokenContract as `0x${string}`,
            ),
        },
      ],
    });
  }

  return assets;
};
