import type { PublicClient, WalletClient } from "viem";
import { Services } from "~/store";
import type { Store } from "~/store";

export function assetsEvents(store: Store) {
	return {
		faucetErc20(input: {
			address?: string;
			walletClient?: WalletClient;
			publicClient?: PublicClient;
		}) {
			store.send(Services.assets, { type: "FAUCET_ERC20", input });
		},
	};
}
