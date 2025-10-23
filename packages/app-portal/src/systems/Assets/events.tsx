import type { Asset, Provider } from 'fuels';
import type { PublicClient, WalletClient } from 'viem';
import { Services } from '~portal/store';
import type { Store } from '~portal/store';

export function assetsEvents(store: Store) {
  return {
    faucetErc20(input: {
      asset?: Asset;
      address?: string;
      walletClient?: WalletClient;
      publicClient?: PublicClient;
    }) {
      store.send(Services.assets, { type: 'FAUCET_ERC20', input });
    },
    getDefaultAssets(input: {
      provider?: Provider;
      address?: string | null;
    }) {
      store.send(Services.assets, { type: 'GET_DEFAULT_ASSETS', input });
    },
  };
}
