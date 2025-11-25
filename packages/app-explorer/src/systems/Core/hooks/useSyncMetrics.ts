import { useQuery } from 'wagmi/query';
import { fuelCoreSdk, sdk } from '../utils/sdk';

export interface SyncMetrics {
  fuelCoreLastBlockHeight: number;
  lastBlockHeightSynced: number;
  blockHeightSyncDelay: number;
  isHealthy: boolean;
  fuelCoreHealthy: boolean;
}

const FUEL_CORE_TIMEOUT_MS = 2000;

export const useSyncMetrics = () => {
  return useQuery({
    queryKey: ['syncMetrics'],
    queryFn: async (): Promise<SyncMetrics> => {
      const indexerResponse = await sdk.blocks({ last: 1 });
      const blocks = indexerResponse.data?.blocks;
      const lastBlock = blocks?.edges?.[0]?.node;
      const lastBlockHeightSynced = lastBlock
        ? Number(lastBlock.header?.height ?? '0')
        : 0;

      let fuelCoreLastBlockHeight = lastBlockHeightSynced;
      let fuelCoreHealthy = true;

      try {
        const fuelCorePromise = fuelCoreSdk.blocks({ last: 1 });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), FUEL_CORE_TIMEOUT_MS),
        );

        const fuelCoreResponse = await Promise.race([
          fuelCorePromise,
          timeoutPromise,
        ]);

        const fuelCoreBlocks = fuelCoreResponse.data?.blocks?.nodes;
        if (fuelCoreBlocks && fuelCoreBlocks.length > 0) {
          fuelCoreLastBlockHeight = Number(
            fuelCoreBlocks[0]?.header?.height ?? '0',
          );
        } else {
          fuelCoreHealthy = false;
        }
      } catch {
        fuelCoreHealthy = false;
      }

      const blockHeightSyncDelay =
        fuelCoreLastBlockHeight - lastBlockHeightSynced;
      const isHealthy = blockHeightSyncDelay < 100;

      return {
        fuelCoreLastBlockHeight,
        lastBlockHeightSynced,
        blockHeightSyncDelay,
        isHealthy,
        fuelCoreHealthy,
      };
    },
    refetchInterval: 10000, // Poll every 10 seconds
    retry: 2,
    staleTime: 8000, // Consider data stale after 8 seconds
  });
};
