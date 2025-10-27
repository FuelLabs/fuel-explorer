import { STAKING_ENV, STAKING_MAINNET_FALLBACKS } from 'app-commons';
import type { StakingEnvFallback } from 'app-commons';
import { StakingEndpointsService } from '~staking/systems/Staking/services/StakingEndpointsService';

interface CosmosProps {
  baseDomain: string;
  path: `/${string}`;
  system: 'COSMOS';
  endpointType: keyof StakingEnvFallback['COSMOS']; // 'REST',  'INDEXER' is not included as only exists in SimplyStaking's node.
  init?: RequestInit;
  timeout?: number;
}

interface CometProps {
  baseDomain: string;
  path: `/${string}`;
  system: 'COMET';
  endpointType: keyof StakingEnvFallback['COMET']; // 'SECURE' | 'REST'
  init?: RequestInit;
  timeout?: number;
}

type Props = CosmosProps | CometProps;

export async function fetchStakingWithFallback<T>({
  baseDomain,
  path,
  system,
  endpointType,
  init,
  timeout = 5000,
}: Props): Promise<T> {
  const fallbackPaths: Array<string> =
    STAKING_ENV === 'MAINNET'
      ? [baseDomain].concat(
          STAKING_MAINNET_FALLBACKS.map((data) => {
            // Type guard to ensure the property exists
            if (
              system === 'COMET' &&
              endpointType === 'SECURE' &&
              'SECURE' in data[system]
            ) {
              return data[system][endpointType as 'SECURE'];
            }
            return data[system][endpointType as 'REST'];
          }),
        )
      : // Should not retry outside Mainnet
        [baseDomain];

  for (const [index, url] of fallbackPaths.entries()) {
    try {
      // If fallback is the same as the failed base request
      if (index > 0 && url.startsWith(baseDomain)) continue;

      const controller = new AbortController();
      const id = setTimeout(() => {
        if (index !== fallbackPaths.length - 1) {
          controller.abort();
        }
      }, timeout);

      const response = await fetch(`${url}${path}`, {
        ...init,
        signal: controller.signal,
      });
      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }

      const responseJson = await response.json();
      // Update the fallback urls if the request passes. Avoids mismatched endpoints accross the project
      if (url === baseDomain || !STAKING_MAINNET_FALLBACKS?.[index - 1]) {
        StakingEndpointsService.updateCurrentCosmosCometUrls(
          StakingEndpointsService.getDefaultCosmosCometUrls(),
        );
      } else {
        // -1 since we added the basePath to fallbackPaths
        StakingEndpointsService.updateCurrentCosmosCometUrls(
          STAKING_MAINNET_FALLBACKS[index - 1],
        );
      }
      return responseJson;
    } catch (error) {
      console.warn(`Fetch to ${url} failed:`, error);
      // Continue to the next URL
    }
  }
  throw new Error('All fetch attempts failed.');
}
