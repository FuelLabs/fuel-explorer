import { NEXT_PUBLIC_ETH_CHAIN_NAME } from 'app-commons';
import { ETH_CHAINS } from './eth/chains';

export const ETH_CHAIN = ETH_CHAINS[NEXT_PUBLIC_ETH_CHAIN_NAME as string];
