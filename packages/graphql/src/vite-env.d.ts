/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALCHEMY_ID: string;
  readonly VITE_FUEL_INDEXER_API: string;
  readonly VITE_INFURA_ID: string;
  readonly VITE_WALLETCONNECT_ID: string;
  readonly VITE_SHOW_CONVERT_BUTTON: string;
  readonly VITE_FUEL_PREDICATES_CONNECTORS_URL: string;
  readonly VITE_ECOSYSTEM_PROJECTS_URL: string;
  readonly VITE_VERCEL_GIT_COMMIT_SHA: string;
  readonly VITE_IS_PUBLIC_PREVIEW: string;
  readonly VITE_STAKING_ENV: string;
  readonly VITE_L1_DISABLE_WITHDRAW: string;
  readonly VITE_SHOW_CLAIM_BUTTON: string;
  readonly VITE_COSMOS_API_MAINNET: string;
  readonly VITE_COSMOS_API_SANDBOX: string;
  readonly VITE_COSMOS_API_TESTNET: string;
  readonly VITE_COSMOS_API_LOCAL: string;
  readonly VITE_COSMOS_INDEXER_API_MAINNET: string;
  readonly VITE_COSMOS_INDEXER_API_SANDBOX: string;
  readonly VITE_COSMOS_INDEXER_API_TESTNET: string;
  readonly VITE_COSMOS_INDEXER_API_LOCAL: string;
  readonly VITE_COMET_SECURE_API_MAINNET: string;
  readonly VITE_COMET_SECURE_API_SANDBOX: string;
  readonly VITE_COMET_SECURE_API_TESTNET: string;
  readonly VITE_COMET_SECURE_API_LOCAL: string;
  readonly VITE_FUEL_CHAIN_NAME: string;
  readonly VITE_BASE_PATH: string;
  readonly BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 