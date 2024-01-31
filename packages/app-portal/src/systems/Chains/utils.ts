import { isEthChain } from './eth';
import { isFuelChain } from './fuel';
import type { SupportedChain } from './types';

export const getChainName = (network?: SupportedChain) => {
  if (isEthChain(network)) {
    return 'Ethereum';
  }

  if (isFuelChain(network)) {
    return 'Fuel';
  }

  return '';
};
