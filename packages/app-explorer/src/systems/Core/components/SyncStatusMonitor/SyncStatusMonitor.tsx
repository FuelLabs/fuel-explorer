import { FrameCorners, Square } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { type SyncMetrics, useSyncMetrics } from '../../hooks/useSyncMetrics';

const SYNC_DELAY_THRESHOLD = 300;

export function SyncStatusMonitor() {
  const { t } = useTranslation();
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
    <div
      role="status"
      className="relative fuel-appear mt-1 mb-6 flex items-start gap-3 border border-[var(--fuel-line)] px-4 py-3"
    >
      <FrameCorners variant="pair" />
      <Square className="mt-[6px]" />
      <p className="m-0 text-[14px] text-[var(--fuel-element-low-em)] leading-[20px]">
        {t('core.sync_status.message')}
      </p>
    </div>
  );
}
