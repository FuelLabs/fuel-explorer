import {
  http,
  type FallbackTransport,
  type HttpTransport,
  fallback,
} from 'viem';
import { ETH_CHAIN_NAME } from '../constants/chainName';

export function getFallbackTransport(
  transports: Array<HttpTransport>,
): FallbackTransport {
  // For foundry, force a local endpoint regardless
  if (ETH_CHAIN_NAME.toLowerCase() === 'foundry') {
    return fallback([http('http://localhost:8545')], {
      retryCount: 0,
      retryDelay: 0,
    });
  }

  return fallback(transports, {
    key: 'fallback-transports',
    rank: {
      interval: 600_000,
    },
    retryCount: transports.length,
  });
}
