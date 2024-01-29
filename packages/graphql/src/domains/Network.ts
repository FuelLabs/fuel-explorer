import { Provider } from 'fuels';

export class NetworkDomain {
  static async getChainInfo(url: string) {
    const provider = await Provider.create(url);
    return provider.getChain();
  }
}
