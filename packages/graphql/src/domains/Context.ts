import type { Context } from "../utils/domain";

import { NetworkDomain } from "./Network";

export class ContextDomain {
  static async createContext(providerUrl: string): Promise<Context> {
    const chainInfo = await NetworkDomain.getChainInfo(providerUrl);
    return { url: providerUrl, chainInfo };
  }
}
