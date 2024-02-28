import { FUEL_CHAINS } from 'app-commons';
import type { SupportedChain } from '../../types';

export const FUEL_UNITS = 9;

export const isFuelChain = (chain?: SupportedChain | null) => {
  return !!Object.keys(FUEL_CHAINS).find(
    (key) => FUEL_CHAINS[key].name === chain?.name,
  );
};
