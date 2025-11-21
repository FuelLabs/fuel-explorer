import { useQuery } from 'wagmi/query';

export interface SyncMetrics {
  fuelCoreLastBlockHeight: number;
  lastBlockHeightSynced: number;
  blockHeightSyncDelay: number;
  isHealthy: boolean;
  fuelCoreHealthy: boolean;
}

export const useSyncMetrics = () => {
  const indexerApi = import.meta.env.VITE_FUEL_INDEXER_API;

  return useQuery({
    queryKey: ['syncMetrics'],
    queryFn: async (): Promise<SyncMetrics> => {
      if (!indexerApi) {
        throw new Error(
          'VITE_FUEL_INDEXER_API environment variable is not set',
        );
      }

      const response = await fetch(`${indexerApi}/metrics`);
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }

      const metricsText = await response.text();

      const metrics = parsePrometheusMetrics(metricsText);

      return {
        fuelCoreLastBlockHeight:
          metrics.explorer_indexer_fuel_core_last_block_height || 0,
        lastBlockHeightSynced:
          metrics.explorer_indexer_last_block_height_synced || 0,
        blockHeightSyncDelay:
          metrics.explorer_indexer_block_height_sync_delay || 0,
        isHealthy: metrics.explorer_indexer_health === 1,
        fuelCoreHealthy: metrics.explorer_indexer_fuel_core_health === 1,
      };
    },
    refetchInterval: 10000, // Poll every 10 seconds
    retry: 2,
    staleTime: 8000, // Consider data stale after 8 seconds
  });
};

function parsePrometheusMetrics(metricsText: string): Record<string, number> {
  const metrics: Record<string, number> = {};

  const lines = metricsText.split('\n');
  for (const line of lines) {
    // Skip comments and empty lines
    if (!line || line.startsWith('#')) {
      continue;
    }

    // Parse "metric_name value" format
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      const metricName = parts[0];
      const value = Number.parseFloat(parts[1]);
      if (!Number.isNaN(value)) {
        metrics[metricName] = value;
      }
    }
  }

  return metrics;
}
