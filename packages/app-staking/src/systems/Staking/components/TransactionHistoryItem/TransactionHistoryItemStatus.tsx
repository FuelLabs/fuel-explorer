import { useTranslation } from 'react-i18next';
import { useETA } from '~staking/systems/Staking/hooks/useETA';
import type { StakingEvent } from '../../types/l1/events';
import { type EventStatus, eventStatus } from './constants';

interface TransactionHistoryItemStatusProps {
  event: StakingEvent;
}

const MARKER: Record<EventStatus, string> = {
  completed: 'border-[var(--fuel-primary)] bg-[var(--fuel-primary)]',
  action:
    'border-[var(--fuel-element-high-em)] bg-[var(--fuel-element-high-em)]',
  failed: 'border-[var(--red-10)] bg-[var(--red-10)]',
  progress: 'border-[var(--fuel-indicator-border)] bg-transparent',
};

const LABEL: Record<EventStatus, string> = {
  completed: 'staking.history.status_completed',
  action: 'staking.history.status_action',
  failed: 'staking.history.status_failed',
  progress: 'staking.history.status_progress',
};

export const TransactionHistoryItemStatus = ({
  event,
}: TransactionHistoryItemStatusProps) => {
  const { t } = useTranslation();
  const status = eventStatus(event);
  const isInProgress = status === 'progress';

  const { eta, progress } = useETA({
    startDate: event.statusInfo?.TransactionSent?.ethTx.timestamp,
    endDate: event.timestampToFinish,
  });

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className={`size-2 shrink-0 border ${MARKER[status]}`}
        />
        <span className="fuel-label text-[var(--fuel-element-mid-em)]">
          {t(LABEL[status])}
        </span>
        {isInProgress && eta && (
          <span className="fuel-label">
            {t('staking.board.time_left', { eta })}
          </span>
        )}
      </span>
      {isInProgress && typeof progress === 'number' && (
        <span
          aria-hidden
          className="block h-[2px] w-full max-w-[150px] bg-[var(--fuel-line)]"
        >
          <span
            className="block h-full origin-left bg-[var(--fuel-primary)] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{
              transform: `scaleX(${Math.min(100, Math.max(0, progress)) / 100})`,
            }}
          />
        </span>
      )}
    </div>
  );
};
