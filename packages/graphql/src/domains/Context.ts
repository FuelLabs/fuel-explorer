import { Provider } from 'fuels';
import type { Context } from '../utils/domain';

import { NetworkDomain } from './Network';

export class ContextDomain {
  static async createContext(providerUrl: string): Promise<Context> {
    const chainInfo = await NetworkDomain.getChainInfo(providerUrl);
    const provider = await Provider.create(providerUrl);
    return {
      provider,
      url: providerUrl,
      chainInfo,
    };
  }
}
