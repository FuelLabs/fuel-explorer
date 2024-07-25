import {
  ALCHEMY_ID,
  ETH_CHAIN_NAME,
  INFURA_ID,
  IS_ETH_DEV_CHAIN,
} from 'app-commons';
import { type Chain, fallback } from 'viem';
import { http, cookieStorage, createStorage } from 'wagmi';
import { createConfig } from 'wagmi';
import { generateETHConnectors } from '~portal/systems/Core/utils/connectors';
import { ETH_CHAINS } from './eth/chains';

export const ETH_CHAIN = ETH_CHAINS[ETH_CHAIN_NAME];

export const APP = {
  name: 'Fuel Bridge',
  description: 'Bridge assets between Fuel and Other Chains',
  url: 'https://fuels-portal.vercel.app',
  icons: ['https://fuels-portal.vercel.app/fuel-logo.svg'],
};

export const CHAINS_TO_CONNECT = [ETH_CHAIN] as [Chain, ...Chain[]];

export const DEFAULT_CHAIN_NAME = ETH_CHAIN?.name.toLowerCase();
export const TRANSPORTS = {
  [CHAINS_TO_CONNECT[0].id]: IS_ETH_DEV_CHAIN
    ? http()
    : fallback(
        [
          http(
            `https://eth-${DEFAULT_CHAIN_NAME}.g.alchemy.com/v2/${ALCHEMY_ID}`,
          ),
          http(`https://${DEFAULT_CHAIN_NAME}.infura.io/v3/${INFURA_ID}`),
          http(),
        ],
        { rank: false },
      ),
};

export const DEFAULT_WAGMI_CONFIG = createConfig({
  chains: CHAINS_TO_CONNECT,
  connectors: generateETHConnectors(APP.name),
  transports: TRANSPORTS,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});
