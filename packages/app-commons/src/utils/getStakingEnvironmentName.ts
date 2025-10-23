import type { StakingEnv } from '../types/staking';

// Helper function to safely access environment variables
const getEnvVar = (key: string): string | undefined => {
  // In browser environment with Vite, use import.meta.env
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const env = import.meta.env as unknown as Record<
      string,
      string | undefined
    >;
    return env[key];
  }
  // In Node.js environment, use process.env via globalThis
  const nodeProcess = (
    globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process;
  if (nodeProcess?.env) {
    return nodeProcess.env[key];
  }
  return undefined;
};

/**
 * Determines the staking environment name based on the provided fuel chain name.
 *
 * @param {FuelChainName} environment - The name of the fuel chain environment.
 * @returns {StakingEnvName} The corresponding staking environment name.
 */
export function getStakingEnvironmentName(environment: string): StakingEnv {
  if (getEnvVar('VITE_STAKING_ENV')) {
    return getEnvVar('VITE_STAKING_ENV') as StakingEnv;
  }

  switch (environment) {
    case 'fuelMainnet':
      return 'MAINNET';

    case 'fuelDevnet':
      return 'SANDBOX';

    case 'fuelTestnet':
      return 'TESTNET';

    default:
      return 'LOCAL';
  }
}
