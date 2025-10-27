import { getEthereumChainName } from '../utils/getEthereumChainName';

export type FuelChainName =
  | 'fuelLocal'
  | 'fuelTestnet'
  | 'fuelDevnet'
  | 'fuelMainnet';

/**
 * Centralize the chain name logic. This ensures that all modules use the same
 * chain name derived from the environment.
 */
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
  // In Node.js environment, use process.env
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

// Vite environment variable for chain name
const rawChainName = getEnvVar('VITE_FUEL_CHAIN_NAME');
export const FUEL_CHAIN_NAME = (rawChainName || 'fuelTestnet') as FuelChainName;

export const ETH_CHAIN_NAME = getEthereumChainName(FUEL_CHAIN_NAME);
