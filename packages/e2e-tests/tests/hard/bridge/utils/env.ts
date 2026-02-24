export const isTestnetEnvironment = () => {
  const chainName = process.env.VITE_FUEL_CHAIN_NAME;
  return (
    chainName === 'fuelTestnet' || process.env.E2E_TARGET_ENV === 'testnet'
  );
};

export const getProviderUrl = () => {
  if (process.env.FUEL_PROVIDER_URL) {
    return process.env.FUEL_PROVIDER_URL;
  }
  return isTestnetEnvironment()
    ? 'https://testnet.fuel.network/v1/graphql'
    : 'http://localhost:4000/v1/graphql';
};

export const getMetaMaskNetwork = () => {
  return isTestnetEnvironment() ? 'sepolia' : 'localhost';
};
