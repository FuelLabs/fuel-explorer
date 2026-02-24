export const isTestnetEnvironment = () => {
  const chainName = process.env.VITE_FUEL_CHAIN_NAME;
  return (
    chainName === 'fuelTestnet' || process.env.E2E_TARGET_ENV === 'testnet'
  );
};

export const isLocalEnvironment = () => {
  return !isTestnetEnvironment();
};

export const getProviderUrl = () => {
  if (isTestnetEnvironment()) {
    return (
      process.env.FUEL_PROVIDER_URL || 'https://testnet.fuel.network/v1/graphql'
    );
  }
  return process.env.FUEL_PROVIDER_URL || 'http://localhost:4000/v1/graphql';
};

export const getEthereumChain = () => {
  if (isTestnetEnvironment()) {
    return 'sepolia';
  }
  return 'foundry';
};

export const getNetworkTimeouts = () => {
  return isTestnetEnvironment()
    ? { transaction: 360000, polling: 60000 } // 6min tx, 1min poll
    : { transaction: 120000, polling: 10000 }; // 2min tx, 10s poll
};

export const getMetaMaskNetwork = () => {
  if (isTestnetEnvironment()) {
    return 'sepolia';
  }
  return 'localhost';
};
