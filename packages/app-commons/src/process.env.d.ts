declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Portal
      NEXT_PUBLIC_ALCHEMY_ID: string;
      NEXT_PUBLIC_INFURA_ID: string;
      NEXT_PUBLIC_WALLETCONNECT_ID: string;
      NEXT_PUBLIC_ETH_CHAIN_NAME: 'foundry' | 'sepolia';
      NEXT_PUBLIC_FUEL_CHAIN_NAME: 'fuelLocal' | 'fuelTestnet' | 'fuelDevnet';
      NEXT_PUBLIC_FUEL_VERSION: string;
      NEXT_PUBLIC_IS_PUBLIC_PREVIEW: string;
      NEXT_PUBLIC_WALLET_INSTALL: string;
      NEXT_PUBLIC_WALLET_INSTALL_NEXT: string;

      // Explorer API URL
      FUEL_EXPLORER_API: string;
      FUEL_EXPLORER_API_KEY: string;
    }
  }
}

export {};
