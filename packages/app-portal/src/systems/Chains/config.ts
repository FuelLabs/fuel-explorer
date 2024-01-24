import { VITE_ETH_CHAIN, VITE_FUEL_CHAIN } from '~/config';

import { ETH_CHAINS } from './eth';
import { FUEL_CHAINS } from './fuel';

export const ETH_CHAIN = ETH_CHAINS[VITE_ETH_CHAIN];
export const FUEL_CHAIN = FUEL_CHAINS[VITE_FUEL_CHAIN];
