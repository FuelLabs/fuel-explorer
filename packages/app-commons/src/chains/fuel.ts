import { CHAIN_IDS } from 'fuels';
import { FUEL_CHAIN_NAME } from '../constants/chainName';
import type { FuelChainName } from '../constants/chainName';

export type FuelChain = {
  id: number;
  network: string;
  name: string;
  testnet: boolean;
  providerUrl: string;
  hidden?: boolean;
  blockExplorerUrl?: string;
};

const fuelLocal: FuelChain = {
  id: CHAIN_IDS.fuel.devnet,
  network: 'fuel_local',
  name: 'Fuel Local',
  testnet: true,
  hidden: true,
  providerUrl: 'http://localhost:4000/v1/graphql',
  blockExplorerUrl: '',
};

const fuelTestnet: FuelChain = {
  id: CHAIN_IDS.fuel.testnet,
  network: 'fuel_testnet',
  name: 'Fuel Testnet',
  testnet: true,
  providerUrl: 'https://testnet.fuel.network/v1/graphql',
  blockExplorerUrl: 'https://app-testnet.fuel.network',
};

const fuelDevnet: FuelChain = {
  id: CHAIN_IDS.fuel.devnet,
  network: 'fuel_devnet',
  name: 'Fuel Devnet',
  testnet: true,
  providerUrl: 'https://devnet.fuel.network/v1/graphql',
  blockExplorerUrl: 'https://app-devnet.fuel.network',
  hidden: true,
};

const fuelMainnet: FuelChain = {
  id: CHAIN_IDS.fuel.mainnet,
  network: 'fuel_mainnet',
  name: 'Ignition',
  testnet: false,
  providerUrl: 'https://mainnet.fuel.network/v1/graphql',
  blockExplorerUrl: 'https://app.fuel.network',
};

export const FUEL_CHAINS: Record<FuelChainName, FuelChain> = {
  fuelLocal,
  fuelTestnet,
  fuelDevnet,
  fuelMainnet,
};

export const FUEL_CHAIN: FuelChain = FUEL_CHAINS[FUEL_CHAIN_NAME];
