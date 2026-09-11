import { useQuery } from 'wagmi/query';

export interface SyncMetrics {
  fuelCoreLastBlockHeight: number;
  lastBlockHeightSynced: number;
  blockHeightSyncDelay: number;
  isHealthy: boolean;
  fuelCoreHealthy: boolean;
}

// Subset of api-lite's GET /health payload.
interface ApiHealthResponse {
  fuelCore: 'up' | 'down';
  fuelCoreTip: number;
  servedTip: number;
  lag: number;
}

const HEALTH_FETCH_TIMEOUT_MS = 2000;

export const useSyncMetrics = () => {
  return useQuery({
    queryKey: ['syncMetrics'],
    queryFn: async (): Promise<SyncMetrics> => {
      const response = await fetch(
        `${import.meta.env.VITE_FUEL_INDEXER_API}/health`,
        { signal: AbortSignal.timeout(HEALTH_FETCH_TIMEOUT_MS) },
      );
      // A 503 still carries a JSON body; surface it as a query error anyway.
      if (!response.ok) {
        throw new Error(`GET /health returned ${response.status}`);
      }
      const health: ApiHealthResponse = await response.json();

      const fuelCoreLastBlockHeight = health.fuelCoreTip;
      const lastBlockHeightSynced = health.servedTip;
      const blockHeightSyncDelay = health.lag;
      const fuelCoreHealthy = health.fuelCore === 'up';
      const isHealthy = blockHeightSyncDelay < 100;

      return {
        fuelCoreLastBlockHeight,
        lastBlockHeightSynced,
        blockHeightSyncDelay,
        isHealthy,
        fuelCoreHealthy,
      };
    },
    refetchInterval: 30000,
    retry: 2,
    staleTime: 30000,
  });
};
