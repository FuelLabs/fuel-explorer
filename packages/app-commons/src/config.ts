// Next.js parse the process.env.XYZ to the browser. using vars won't work (ex: process.env[var])

import { ETH_CHAIN_NAME, FUEL_CHAIN_NAME } from './constants/chainName';
import type { StakingEnv, StakingEnvFallback } from './types/staking';
import { getStakingEnvironmentName } from './utils/getStakingEnvironmentName';

// Helper function to safely access environment variables in both browser and Node.js
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

// Vite environment variables
export const ALCHEMY_ID = getEnvVar('VITE_ALCHEMY_ID');
export const FUEL_INDEXER_API = getEnvVar('VITE_FUEL_INDEXER_API');
export const INFURA_ID = getEnvVar('VITE_INFURA_ID');
export const WALLETCONNECT_ID = getEnvVar('VITE_WALLETCONNECT_ID');
export const SHOW_CONVERT_BUTTON = getEnvVar('VITE_SHOW_CONVERT_BUTTON');
export const FUEL_PREDICATES_CONNECTORS_URL = getEnvVar(
  'VITE_FUEL_PREDICATES_CONNECTORS_URL',
);
export const ECOSYSTEM_PROJECTS_URL = getEnvVar('VITE_ECOSYSTEM_PROJECTS_URL');
export const APP_COMMIT_HASH = String(
  getEnvVar('VITE_VERCEL_GIT_COMMIT_SHA') || '',
).slice(0, 6);
export const NODE_ENV = 'development';

export const IS_PREVIEW = getEnvVar('VITE_IS_PUBLIC_PREVIEW') === 'true';
export const IS_DEVELOPMENT = true;
export const IS_TEST = false;

const ethChainName = ETH_CHAIN_NAME?.toLowerCase();
export const IS_ETH_DEV_CHAIN = !!(ethChainName && ethChainName === 'foundry');
export const IS_ETH_SEPOLIA_CHAIN = !!(
  ethChainName && ethChainName === 'sepolia'
);
export const IS_ETH_MAINNET_CHAIN = !!(
  ethChainName && ethChainName === 'mainnet'
);

export const IS_FUEL_DEV_CHAIN = FUEL_CHAIN_NAME === 'fuelLocal';
export const IS_FUEL_TESTNET_CHAIN = FUEL_CHAIN_NAME === 'fuelTestnet';
export const IS_FUEL_DEVNET_CHAIN = FUEL_CHAIN_NAME === 'fuelDevnet';
export const IS_FUEL_MAINNET_CHAIN = FUEL_CHAIN_NAME === 'fuelMainnet';

export const FUEL_TOKEN_UNITS = 18;

export const STAKING_ENV: StakingEnv =
  (getEnvVar('VITE_STAKING_ENV') as StakingEnv | undefined) ||
  getStakingEnvironmentName(FUEL_CHAIN_NAME);
export const L1_DISABLE_WITHDRAW = getEnvVar('VITE_L1_DISABLE_WITHDRAW');
export const SHOW_CLAIM_BUTTON = getEnvVar('VITE_SHOW_CLAIM_BUTTON');

// Staking ENVs
// Vite environment variables for API endpoints
const COSMOS_API_MAP: Record<string, string | undefined> = {
  MAINNET: getEnvVar('VITE_COSMOS_API_MAINNET'),
  SANDBOX: getEnvVar('VITE_COSMOS_API_SANDBOX'),
  TESTNET: getEnvVar('VITE_COSMOS_API_TESTNET'),
  LOCAL: getEnvVar('VITE_COSMOS_API_LOCAL'),
};

const COSMOS_INDEXER_API_MAP: Record<string, string | undefined> = {
  MAINNET: getEnvVar('VITE_COSMOS_INDEXER_API_MAINNET'),
  SANDBOX: getEnvVar('VITE_COSMOS_INDEXER_API_SANDBOX'),
  TESTNET: getEnvVar('VITE_COSMOS_INDEXER_API_TESTNET'),
  LOCAL: getEnvVar('VITE_COSMOS_INDEXER_API_LOCAL'),
};

const COMET_SECURE_API_MAP: Record<string, string | undefined> = {
  MAINNET: getEnvVar('VITE_COMET_SECURE_API_MAINNET'),
  SANDBOX: getEnvVar('VITE_COMET_SECURE_API_SANDBOX'),
  TESTNET: getEnvVar('VITE_COMET_SECURE_API_TESTNET'),
  LOCAL: getEnvVar('VITE_COMET_SECURE_API_LOCAL'),
};

export const COSMOS_API = COSMOS_API_MAP[STAKING_ENV];
export const COSMOS_INDEXER_API = COSMOS_INDEXER_API_MAP[STAKING_ENV];
export const COMET_SECURE_API = COMET_SECURE_API_MAP[STAKING_ENV];

export const STAKING_MAINNET_FALLBACKS: Array<StakingEnvFallback> = [
  {
    COSMOS: {
      REST: 'https://rest-fuel-seq.simplystaking.xyz',
    },
    COMET: {
      SECURE: 'https://rpc-fuel-seq.simplystaking.xyz',
    },
  },
  {
    COSMOS: {
      REST: 'https://rest-fuel.kintsugi-nodes.com/',
    },
    COMET: {
      SECURE: 'https://rpc-fuel.kintsugi-nodes.com',
    },
  },
  {
    COSMOS: {
      REST: ' https://fuel-rest.polkachu.com',
    },
    COMET: {
      SECURE: ' https://fuel-rpc.polkachu.com',
    },
  },
];
