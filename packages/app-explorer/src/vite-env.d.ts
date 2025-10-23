/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_URL: string;
  readonly VITE_FUEL_INDEXER_API: string;
  readonly VITE_FUEL_INDEXER_API_KEY: string;
  readonly VITE_FUEL_INDEXER_MAINNET_KEY: string;
  readonly VITE_FUEL_PROVIDER: string;

  // Chain Configuration
  readonly VITE_FUEL_CHAIN_NAME: string;
  readonly VITE_FUEL_VERSION: string;

  // Portal & Wallet Configuration
  readonly VITE_ALCHEMY_ID: string;
  readonly VITE_INFURA_ID: string;
  readonly VITE_WALLETCONNECT_ID: string;
  readonly VITE_WALLET_INSTALL: string;
  readonly VITE_WALLET_INSTALL_NEXT: string;

  // Feature Flags
  readonly VITE_IS_PUBLIC_PREVIEW: string;
  readonly VITE_SHOW_CONVERT_BUTTON: string;
  readonly VITE_SHOW_CLAIM_BUTTON: string;

  // External Services
  readonly VITE_ECOSYSTEM_PROJECTS_URL: string;
  readonly VITE_SAFARY_ID: string;

  // Staking Configuration
  readonly VITE_STAKING_ENV: string;

  // Cosmos API Endpoints
  readonly VITE_COSMOS_API_MAINNET: string;
  readonly VITE_COSMOS_API_SANDBOX: string;
  readonly VITE_COSMOS_API_TESTNET: string;
  readonly VITE_COSMOS_API_LOCAL: string;

  // Cosmos Indexer API Endpoints
  readonly VITE_COSMOS_INDEXER_API_MAINNET: string;
  readonly VITE_COSMOS_INDEXER_API_SANDBOX: string;
  readonly VITE_COSMOS_INDEXER_API_TESTNET: string;
  readonly VITE_COSMOS_INDEXER_API_LOCAL: string;

  // Comet API Endpoints (Secure)
  readonly VITE_COMET_SECURE_API_MAINNET: string;
  readonly VITE_COMET_SECURE_API_SANDBOX: string;
  readonly VITE_COMET_SECURE_API_TESTNET: string;
  readonly VITE_COMET_SECURE_API_LOCAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
