declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FUEL_CHAIN_NAME: 'fuelDev' | 'fuelTestnet';
      PRIVATE_KEY: string;
    }
  }
}

export {};
