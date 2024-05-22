declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FUEL_CHAIN_NAME: 'fuelLocal' | 'fuelTestnet';
      PRIVATE_KEY: string;
    }
  }
}

export {};
