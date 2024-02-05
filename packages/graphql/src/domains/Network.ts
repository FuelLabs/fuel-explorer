import { Provider } from "fuels";

import { Cache } from "../utils";

const CHAIN_CACHE = 43200000;

export class NetworkDomain {
	static cache = new Cache();

	static async getChainInfo(url: string) {
		let provider = NetworkDomain.cache.get<Provider>(url);
		if (!provider) {
			provider = await Provider.create(url);
		}
		NetworkDomain.cache.put(url, provider, CHAIN_CACHE);
		return provider.getChain();
	}
}
