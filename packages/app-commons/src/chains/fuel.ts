import { FUEL_CHAIN_NAME } from '../config';

type ChainName = typeof process.env.NEXT_PUBLIC_FUEL_CHAIN_NAME;

export type FuelChain = {
  id: number;
  network: string;
  name: string;
  testnet: boolean;
  providerUrl: string;
};

const fuelDev: FuelChain = {
  id: 10,
  network: 'fuel_devnet',
  name: 'Fuel Devnet',
  testnet: true,
  providerUrl: 'http://localhost:4000/graphql',
};

const fuelBeta5Dev: FuelChain = {
  id: 0,
  network: 'fuel_devnet',
  name: 'Fuel Devnet',
  testnet: true,
  providerUrl: 'https://beta-5.swayswap.io/graphql',
};

const fuelBeta5: FuelChain = {
  id: 0,
  network: 'fuel_beta5',
  name: 'Fuel Beta 5',
  testnet: true,
  providerUrl: 'https://beta-5.fuel.network/graphql',
};

export const FUEL_CHAINS: Record<ChainName, FuelChain> = {
  fuelDev,
  fuelBeta5Dev,
  fuelBeta5,
};

export const FUEL_CHAIN: FuelChain = FUEL_CHAINS[FUEL_CHAIN_NAME];
