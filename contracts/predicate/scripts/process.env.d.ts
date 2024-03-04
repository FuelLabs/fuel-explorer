declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FUEL_CHAIN_NAME: 'fuelDev' | 'fuelBeta5' | 'fuelBeta5Dev';
      PRIVATE_KEY: string;
    }
  }
}

export {};
