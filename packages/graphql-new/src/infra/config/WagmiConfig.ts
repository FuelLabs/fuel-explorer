import { http, createConfig, fallback, getPublicClient } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { Chain, Transport } from 'viem';

import { env } from '~/config';

export class WagmiConfig {
  private ethChainName: string;
  private alchemyId?: string;
  private infuraId?: string;

  constructor() {
    this.ethChainName = env.get('ETH_CHAIN_NAME');
    this.alchemyId = env.get('ETH_ALCHEMY_ID');
    this.infuraId = env.get('ETH_INFURA_ID');
  }

  getPublicClient() {
    return getPublicClient(this.createConfig());
  }

  private createConfig() {
    const transports: Record<Chain['id'], Transport> = {
      [sepolia.id]: fallback(
        [
          http(
            `https://eth-${this.ethChainName}.g.alchemy.com/v2/${this.alchemyId}`,
          ),
          http(`https://${this.ethChainName}.infura.io/v3/${this.infuraId}`),
          http(),
        ],
        { rank: false },
      ),
    };

    return createConfig({
      chains: [sepolia],
      transports,
    });
  }
}
