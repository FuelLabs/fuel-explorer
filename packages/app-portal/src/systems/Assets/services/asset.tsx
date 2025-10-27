import {
  type BridgeTokenContracts,
  CURRENT_NETWORK_FUEL_ASSET_ID,
  ETH_CHAIN,
  FUEL_CHAIN,
  type HexAddress,
  STAKING_CONTRACTS,
} from 'app-commons';
import {
  type Asset,
  CHAIN_IDS,
  DECIMAL_FUEL,
  type Provider,
  Wallet,
  bn,
} from 'fuels';
import { isAddress } from 'viem';
import type { PublicClient, WalletClient } from 'viem';
import { getBalance } from 'wagmi/actions';
import type { AlchemyAssetBalance } from '~portal/systems/Assets/types';
import { PORTAL_WAGMI_CONFIG } from '~portal/systems/Chains/config';
import { EthConnectorService } from '~portal/systems/Chains/eth';
import { forceRetryWithTimeout } from '~portal/systems/Core/utils/forceRetryWithTimeout';

export type AssetServiceInputs = {
  faucetErc20: {
    asset?: Asset;
    address?: string;
    walletClient?: WalletClient;
    publicClient?: PublicClient;
  };
  checkAssetNetwork: {
    asset?: Asset;
    walletClient?: WalletClient;
  };
  getAssetBalances: {
    address?: string | null;
    provider?: Provider;
  };
  getDefaultAssets: {
    address?: string | null;
    provider?: Provider;
    bridgeTokenContracts?: BridgeTokenContracts;
  };
};

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
      address: address as HexAddress,
      publicClient,
    });

    const decimals = await erc20.read.decimals();

    const erc20MintHash = await erc20.write.mint(
      [
        walletClient.account?.address,
        bn.parseUnits('1000000', decimals as number),
      ],
      {
        account: walletClient.account,
      },
    );

    await publicClient.waitForTransactionReceipt({
      hash: erc20MintHash,
    });
  }

  static async getDefaultAssets(
    input: Omit<AssetServiceInputs['getDefaultAssets'], 'address'>,
  ) {
    const { provider, bridgeTokenContracts } = input;

    if (!provider) {
      throw new Error('Missing provider');
    }

    const fetchedAssets = await fetch(
      'https://verified-assets.fuel.network/assets.json',
    );
    const fetchedAssetsJson = (await fetchedAssets.json()) as Array<Asset>;

    const chainId = await provider.getChainId();
    const assets = [...fetchedAssetsJson];
    if (!assets.find((asset) => asset.symbol === 'FUEL')) {
      assets.push({
        icon: `${location.origin}/assets/fuel.png`,
        name: 'FUEL',
        symbol: 'FUEL',
        networks: [
          {
            type: 'ethereum',
            chainId: CHAIN_IDS.eth.mainnet,
            decimals: STAKING_CONTRACTS.MAINNET.FUEL_V2_TOKEN_DECIMALS,
            address: STAKING_CONTRACTS.MAINNET.FUEL_V2_TOKEN,
          },
          {
            type: 'ethereum',
            chainId: CHAIN_IDS.eth.sepolia,
            decimals: STAKING_CONTRACTS.TESTNET.FUEL_V2_TOKEN_DECIMALS,
            address: STAKING_CONTRACTS.TESTNET.FUEL_V2_TOKEN,
          },
          {
            type: 'fuel',
            chainId: FUEL_CHAIN.id,
            decimals: DECIMAL_FUEL,
            contractId: bridgeTokenContracts?.FUEL_TokenContract,
            assetId: CURRENT_NETWORK_FUEL_ASSET_ID,
          },
        ],
      } as Asset);
    }

    if (
      bridgeTokenContracts?.ETH_ERC20 &&
      bridgeTokenContracts?.FUEL_TokenAsset
    ) {
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
            chainId,
            decimals: 9,
            contractId: bridgeTokenContracts.FUEL_TokenContract,
            assetId: bridgeTokenContracts.FUEL_TokenAsset || '',
          },
        ],
      });
    }

    if (
      bridgeTokenContracts?.USDC_FUEL_Asset &&
      bridgeTokenContracts?.USDC_ERC20
    ) {
      assets.push({
        icon: '',
        name: 'USDC Token',
        symbol: 'USDC',
        networks: [
          {
            type: 'ethereum',
            chainId: ETH_CHAIN.id,
            decimals: 6,
            address: bridgeTokenContracts.USDC_ERC20,
          },
          {
            type: 'fuel',
            chainId,
            decimals: 6,
            contractId: bridgeTokenContracts.FUEL_TokenContract,
            assetId: bridgeTokenContracts.USDC_FUEL_Asset || '',
          },
        ],
      });
    }

    return assets;
  }

  static async getFuelBalances(input: AssetServiceInputs['getAssetBalances']) {
    const { provider, address } = input;

    if (!provider) {
      console.error('Missing provider');
      return [];
    }

    if (!address) {
      console.error('Missing address');
      return [];
    }

    try {
      const wallet = Wallet.fromAddress(address, provider);
      const fuelBalances = await wallet.getBalances();
      return fuelBalances.balances;
    } catch (_) {
      return [];
    }
  }

  static async fetchEthereumBalances(
    address: string | null | undefined,
    assets: Array<Asset> | undefined,
    chainId = ETH_CHAIN.id as number,
  ) {
    if (!address || !assets?.length) {
      return [];
    }

    try {
      const balances: Array<AlchemyAssetBalance> = [];
      const promises: Array<Promise<void>> = [];
      for (const asset of assets) {
        const token = asset.networks.find(
          (n) => n.type === 'ethereum' && n.chainId === ETH_CHAIN.id,
        );
        const assetId = (token as any)?.address;

        if (address && !assetId && asset.symbol === 'ETH') {
          promises.push(
            forceRetryWithTimeout(
              () =>
                getBalance(PORTAL_WAGMI_CONFIG, {
                  address: address as HexAddress,
                  chainId,
                }).then((balanceData) => {
                  balances.push({
                    assetId: undefined,
                    decimals: balanceData.decimals,
                    amount: balanceData.value,
                  });
                }),
              800,
              3,
            ),
          );
          continue;
        }
        if (!assetId) {
          continue;
        }

        promises.push(
          forceRetryWithTimeout(
            () =>
              getBalance(PORTAL_WAGMI_CONFIG, {
                address: address as HexAddress,
                chainId,
                token: assetId,
              })
                .then((balance) => {
                  balances.push({
                    assetId,
                    decimals: balance.decimals,
                    amount: balance.value,
                  });
                })
                .catch((e) => {
                  console.error('Error fetching token balances:', e);
                }),
            800,
            3,
          ),
        );
      }
      await Promise.all(promises);
      return balances;
    } catch (error) {
      console.error('Error fetching token balances:', error);
      return [];
    }
  }
}
