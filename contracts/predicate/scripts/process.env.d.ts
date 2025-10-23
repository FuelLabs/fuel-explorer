declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_FUEL_CHAIN_NAME: 'fuelLocal' | 'fuelTestnet';
      PRIVATE_KEY: string;
    }
  }
}

export type {};
