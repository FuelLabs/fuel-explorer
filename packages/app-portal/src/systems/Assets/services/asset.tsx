import assetList from '@fuels/assets';
import type { Asset } from '@fuels/assets';
import { BridgeTokenContracts, FUEL_CHAIN } from 'app-commons';
import { Provider, bn } from 'fuels';
import { isAddress } from 'viem';
import type { PublicClient, WalletClient } from 'viem';
import { ETH_CHAIN, getContractTokenId } from '~portal/systems/Chains';
import { EthConnectorService } from '~portal/systems/Chains/eth';

export type AssetServiceInputs = {
  faucetErc20: {
    address?: string;
    walletClient?: WalletClient;
    publicClient?: PublicClient;
  };
  getDefaultAssets: {
    provider?: Provider;
    bridgeTokenContracts?: BridgeTokenContracts;
  };
};

const defaultAssets: Asset[] = [...assetList];

export class AssetService {
  static async faucetErc20(input: AssetServiceInputs['faucetErc20']) {
    const { address, walletClient, publicClient } = input;

    if (!address || !isAddress(address || '')) {
      throw new Error('Invalid address');
    }
    if (!walletClient) {
      throw new Error('Missing wallet client');
    }
    if (!publicClient) {
      throw new Error('Missing public client');
    }

    const erc20 = EthConnectorService.connectToErc20({
      walletClient,
      address: address as `0x${string}`,
    });

    const erc20MintHash = await (erc20 as any).write.mint(
      [walletClient.account?.address, bn.parseUnits('1000000', 18)],
      {
        account: walletClient.account,
      },
    );

    await publicClient.waitForTransactionReceipt({
      hash: erc20MintHash,
    });
  }

  static getDefaultAssets(input: AssetServiceInputs['getDefaultAssets']) {
    const { provider, bridgeTokenContracts } = input;

    if (!provider) {
      throw new Error('Missing provider');
    }

    // @TODO: Remove when SDK provide correct asset id for the network
    const legacyFuelBaseAssetId =
      '0x0000000000000000000000000000000000000000000000000000000000000000';
    const networkBaseAssetId = provider.getBaseAssetId();

    const initialAssets = defaultAssets.map((asset) => {
      const networks = asset.networks.map((network) => {
        if (
          network.chainId === provider.getChainId() &&
          network.type === 'fuel' &&
          network.assetId === legacyFuelBaseAssetId
        ) {
          return {
            ...network,
            assetId: networkBaseAssetId,
          };
        }
        return network;
      });

      return {
        ...asset,
        networks,
      };
    });

    const assets = [...initialAssets];

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
  }
}
