import type { Asset as FuelsAsset } from '@fuels/assets';
import { bn } from 'fuels';
import { isAddress } from 'viem';
import type { PublicClient, WalletClient } from 'viem';
import { EthConnectorService } from '~/systems/Chains/eth';

export type AssetServiceInputs = {
  faucetErc20: {
    address?: string;
    walletClient?: WalletClient;
    publicClient?: PublicClient;
  };
};

export type Asset = Omit<FuelsAsset, 'icon'> & {
  icon: string | null;
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
      address: address as `0x${string}`,
    });

    const erc20MintHash = await erc20.write.mint(
      [walletClient.account?.address, bn.parseUnits('1000000', 18)],
      {
        account: walletClient.account,
      }
    );

    await publicClient.waitForTransactionReceipt({
      hash: erc20MintHash,
    });
  }
}
