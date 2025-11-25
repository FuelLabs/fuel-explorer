import { Alert } from '@fuels/ui';
import { IconInfoCircle } from '@tabler/icons-react';
import { type SyncMetrics, useSyncMetrics } from '../../hooks/useSyncMetrics';

const SYNC_DELAY_THRESHOLD = 60;

export function SyncStatusMonitor() {
  const { data: metrics, isLoading, isError } = useSyncMetrics();

  if (isLoading || isError || !metrics) {
    return null;
  }

  const typedMetrics = metrics as SyncMetrics;
  const isBehind = typedMetrics.blockHeightSyncDelay > SYNC_DELAY_THRESHOLD;
  const shouldShow = isBehind && typedMetrics.fuelCoreHealthy;

  if (!shouldShow) {
    return null;
  }

  return (
    <Alert variant="soft" size="3" color="blue" className="mt-1 mb-6">
      <Alert.Icon>
        <IconInfoCircle size="md" />
      </Alert.Icon>
      <Alert.Text>
        Indexer is experiencing issues. Fuel team is currently working on a fix.
        Some data may be outdated or unavailable.
      </Alert.Text>
    </Alert>
  );
}
