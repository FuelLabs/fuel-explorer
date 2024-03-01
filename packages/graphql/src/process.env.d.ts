declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FUEL_CHAIN_NAME: 'fuelDev' | 'fuelBeta5' | 'fuelBeta5Dev';
      SERVER_BUILD?: 'true' | 'false';
      FUEL_EXPLORER_API_KEY?: string;
    }
  }
}

export {};
