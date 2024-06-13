declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FUEL_PROVIDER?: string;
      SERVER_BUILD?: 'true' | 'false';
      FUEL_EXPLORER_API_KEY?: string;
    }
  }
}

export type {};
