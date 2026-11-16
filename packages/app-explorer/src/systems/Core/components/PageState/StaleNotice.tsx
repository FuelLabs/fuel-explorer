import { Button } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

// A non-blocking notice for a refresh that failed while older data is still on screen.
export function StaleNotice({
  message,
  onRetry,
}: { message: string; onRetry: () => void }) {
  const { t } = useTranslation();
  return (
    <div
      role="status"
      className="mb-4 flex flex-wrap items-center justify-between gap-2 border border-[var(--fuel-line)] px-4 py-2"
    >
      <span className="fuel-caption">{message}</span>
      <Button size="1" variant="ghost" onClick={onRetry}>
        {t('core.retry')}
      </Button>
    </div>
  );
}
