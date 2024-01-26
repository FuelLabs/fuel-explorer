import { ETH_CHAIN, FUEL_CHAIN } from '~/systems/Chains';

type ChainUrlParams = 'eth' | 'fuel' | string | undefined | null;

export const getChainFromUrlParam = (param: ChainUrlParams) => {
  if (param === 'eth') return ETH_CHAIN;
  if (param === 'fuel') return FUEL_CHAIN;

  return undefined;
};
