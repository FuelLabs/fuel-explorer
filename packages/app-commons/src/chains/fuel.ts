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
  network: 'fuel_local',
  name: 'Fuel Local',
  testnet: true,
  providerUrl: 'http://localhost:4000/v1/graphql',
};

const fuelTestnet: FuelChain = {
  id: 0,
  network: 'fuel_testnet',
  name: 'Fuel Testnet',
  testnet: true,
  providerUrl: 'https://testnet.fuel.network/v1/graphql',
};

const fuelBeta5: FuelChain = {
  id: 0,
  network: 'fuel_beta5',
  name: 'Fuel Beta 5',
  testnet: true,
  providerUrl: 'https://beta-5.fuel.network/v1/graphql',
};

export const FUEL_CHAINS: Record<ChainName, FuelChain> = {
  fuelDev,
  fuelTestnet: fuelTestnet,
  fuelBeta5,
};

export const FUEL_CHAIN: FuelChain = FUEL_CHAINS[FUEL_CHAIN_NAME];
