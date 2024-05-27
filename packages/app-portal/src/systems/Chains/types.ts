import type { FUEL_CHAIN } from 'app-commons';
import type { ETH_CHAIN } from './config';

export type SupportedChain = typeof ETH_CHAIN | typeof FUEL_CHAIN;

export type FromToNetworks = {
  fromNetwork: SupportedChain;
  toNetwork: SupportedChain;
};
