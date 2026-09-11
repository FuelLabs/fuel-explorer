import { useQuery } from 'wagmi/query';

export interface SyncMetrics {
  fuelCoreLastBlockHeight: number;
  lastBlockHeightSynced: number;
  blockHeightSyncDelay: number;
  isHealthy: boolean;
  fuelCoreHealthy: boolean;
}

// Subset of api-lite's GET /health payload (packages/api-lite/src/server.ts,
// health()) that this hook needs; the endpoint returns more fields we don't use.
interface ApiHealthResponse {
  fuelCore: 'up' | 'down';
  fuelCoreTip: number;
  servedTip: number;
  lag: number;
}

// Bounds the /health fetch so a stalled API host fails fast and the query
// moves to its retry instead of hanging past the next poll.
const HEALTH_FETCH_TIMEOUT_MS = 2000;

export const useSyncMetrics = () => {
  return useQuery({
    queryKey: ['syncMetrics'],
    queryFn: async (): Promise<SyncMetrics> => {
      // Every visitor's browser used to query fuel-core directly, bypassing
      // api-lite and nginx's rate limit. api-lite already polls fuel-core and
      // exposes both tips on /health, so read the sync state from there instead.
      const response = await fetch(
        `${import.meta.env.VITE_FUEL_INDEXER_API}/health`,
        { signal: AbortSignal.timeout(HEALTH_FETCH_TIMEOUT_MS) },
      );
      // api-lite answers with 503 (still a JSON body) when it considers
      // itself unhealthy; treat that the same as any other non-2xx so a
      // failing API surfaces as a query error instead of the fields below
      // silently reading as zeros/"not behind".
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
    refetchInterval: 30000, // Poll every 30 seconds
    retry: 2,
    staleTime: 30000, // Consider data stale after 30 seconds, matching the poll interval
  });
};
