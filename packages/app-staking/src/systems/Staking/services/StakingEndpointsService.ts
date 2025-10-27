import { STAKING_ENV } from 'app-commons';
import type { StakingEnvFallback } from 'app-commons';

class StakingEndpoints {
  private currentEndpointData: StakingEnvFallback;

  constructor() {
    this.currentEndpointData = this.getDefaultCosmosCometUrls();
  }

  public getDefaultCosmosCometUrls(): StakingEnvFallback {
    // Get environment variables directly via import.meta.env
    const getEnvVar = (key: string): string | undefined => {
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        return (import.meta.env as any)[key];
      }
      return undefined;
    };

    // Map environment to the correct API endpoints
    const envMap: Record<string, string> = {
      MAINNET: 'MAINNET',
      SANDBOX: 'SANDBOX',
      TESTNET: 'TESTNET',
      LOCAL: 'LOCAL',
    };

    const envSuffix = envMap[STAKING_ENV] || 'TESTNET';

    const cosmosApi = getEnvVar(`VITE_COSMOS_API_${envSuffix}`) || '';
    const cometApi = getEnvVar(`VITE_COMET_API_${envSuffix}`) || '';
    const cometSecureApi =
      getEnvVar(`VITE_COMET_SECURE_API_${envSuffix}`) || '';

    return {
      COSMOS: {
        REST: cosmosApi,
      },
      COMET: {
        REST: cometApi,
        SECURE: cometSecureApi,
      },
    };
  }

  public getCurrentCosmosCometUrls(): StakingEnvFallback {
    return this.currentEndpointData;
  }

  // This ensures that we don't use mismatched endpoints
  public updateCurrentCosmosCometUrls(data: StakingEnvFallback): void {
    this.currentEndpointData = data;
  }
}

export const StakingEndpointsService = new StakingEndpoints();
