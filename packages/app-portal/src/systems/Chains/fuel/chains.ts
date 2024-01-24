export type FuelChain = {
  id: number;
  network: string;
  name: string;
  testnet: boolean;
  providerUrl: string;
};

const fuelDev: FuelChain = {
  id: 1001,
  network: 'fuel_devnet',
  name: 'Fuel Devnet',
  testnet: true,
  providerUrl: 'http://localhost:4000/graphql',
};

const fuelBeta4: FuelChain = {
  id: 1002,
  network: 'fuel_beta4',
  name: 'Fuel Beta 4',
  testnet: true,
  providerUrl: 'https://beta-4.fuel.network/graphql',
};

export const FUEL_CHAINS = {
  fuelDev,
  fuelBeta4,
};
