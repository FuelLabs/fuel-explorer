import { FUEL_CHAIN_NAME } from '../config';

type ChainName = typeof process.env.NEXT_PUBLIC_FUEL_CHAIN_NAME;

export type FuelChain = {
  network: string;
  name: string;
  testnet: boolean;
  providerUrl: string;
};

const fuelLocal: FuelChain = {
  network: 'fuel_local',
  name: 'Fuel Local',
  testnet: true,
  providerUrl: process.env.FUEL_PROVIDER || 'http://localhost:4000/v1/graphql',
};

const fuelTestnet: FuelChain = {
  network: 'fuel_testnet',
  name: 'Fuel Testnet',
  testnet: true,
  providerUrl: 'https://testnet.fuel.network/v1/graphql',
};

const fuelDevnet: FuelChain = {
  network: 'fuel_devnet',
  name: 'Fuel Devnet',
  testnet: true,
  providerUrl: 'https://devnet.fuel.network/v1/graphql',
};

export const FUEL_CHAINS: Record<ChainName, FuelChain> = {
  fuelLocal,
  fuelTestnet,
  fuelDevnet,
};

export const FUEL_CHAIN: FuelChain = FUEL_CHAINS[FUEL_CHAIN_NAME];
