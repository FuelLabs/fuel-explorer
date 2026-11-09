import {
  IconButton,
  IconRefresh,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  useSlidingIndicator,
} from '@fuels/ui';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import type { StakingEventType } from '../../types/l1/events';
import {
  type EventStatus,
  typeLabelKey,
} from '../TransactionHistoryItem/constants';

export type StatusFilter = 'all' | EventStatus;
export type TypeFilter = 'all' | StakingEventType;

const STATUSES: EventStatus[] = ['action', 'progress', 'completed', 'failed'];

type TransactionHistoryFiltersProps = {
  status: StatusFilter;
  type: TypeFilter;
  counts: Record<StatusFilter, number>;
  types: StakingEventType[];
  isRefreshing: boolean;
  onStatusChange: (status: StatusFilter) => void;
  onTypeChange: (type: TypeFilter) => void;
  onRefresh: () => void;
};

export function TransactionHistoryFilters({
  status,
  type,
  counts,
  types,
  isRefreshing,
  onStatusChange,
  onTypeChange,
  onRefresh,
}: TransactionHistoryFiltersProps) {
  const { t } = useTranslation();
  const classes = styles();
  const chipsRef = useRef<HTMLDivElement>(null);

  // A status with no transactions has no chip, unless it is the one selected.
  const chips: StatusFilter[] = [
    'all',
    ...STATUSES.filter((value) => counts[value] > 0 || value === status),
  ];
  // Counts change chip widths, so they are part of the key.
  const chipKey = chips.map((value) => `${value}:${counts[value]}`).join('|');

  // The active fill is one element that slides between chips. Counts change
  // chip widths, so they are part of the deps.
  const indicatorRef = useSlidingIndicator<HTMLDivElement, HTMLSpanElement>(
    chipsRef,
    '[aria-pressed="true"]',
    [status, chipKey],
  );

  const statusLabel = (value: StatusFilter) =>
    value === 'all' ? t('common.all') : t(`staking.history.status_${value}`);

  return (
    <div className={classes.root()}>
      <div
        role="group"
        aria-label={t('staking.history.status_label')}
        className={classes.nav()}
      >
        <div ref={chipsRef} className={classes.chips()}>
          <span
            ref={indicatorRef}
            aria-hidden
            className={classes.indicator()}
          />
          {chips.map((value, index) => {
            const active = value === status;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => onStatusChange(value)}
                className={classes.chip({ active, first: index === 0 })}
              >
                {statusLabel(value)}
                <span
                  className={classes.count({
                    active,
                    failed: value === 'failed',
                  })}
                >
                  {counts[value]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className={classes.tools()}>
        <Select
          value={type}
          onValueChange={(value) => onTypeChange(value as TypeFilter)}
        >
          <SelectTrigger
            aria-label={t('staking.history.type_label')}
            className={classes.select()}
          />
          <SelectContent>
            <SelectItem value="all">{t('staking.history.type_all')}</SelectItem>
            {types.map((value) => (
              <SelectItem key={value} value={value}>
                {t(typeLabelKey[value])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <IconButton
          aria-label={t('staking.history.refresh')}
          variant="ghost"
          color="gray"
          size="1"
          icon={IconRefresh}
          isLoading={isRefreshing}
          onClick={onRefresh}
          className={classes.refresh()}
        />
      </div>
    </div>
  );
}

const styles = tv({
  slots: {
    root: 'mb-4 flex flex-col border border-[var(--fuel-line)] bg-[var(--fuel-background)] tablet:flex-row',
    nav: 'min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    chips: 'relative flex min-w-max items-stretch',
    indicator: [
      'pointer-events-none absolute top-0 left-0 h-full w-px origin-left bg-[var(--fuel-primary)] opacity-0',
      'transition-[transform,opacity] [transition-duration:300ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
    ],
    chip: [
      'relative z-10 flex h-11 cursor-pointer items-center gap-2 whitespace-nowrap px-4 tablet:px-5',
      'fuel-eyebrow text-[11px] tracking-[0.08em]',
      'border-y-0 border-r-0 border-l border-solid border-[var(--fuel-line)]',
      'transition-colors duration-200 motion-reduce:transition-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--fuel-focus)]',
    ],
    count: 'tabular-nums transition-colors duration-200',
    tools: [
      'flex h-11 shrink-0 items-center justify-between gap-2 px-3',
      'border-t border-[var(--fuel-line)] tablet:border-t-0 tablet:border-l',
    ],
    select: 'h-8 min-w-[140px] bg-transparent',
    refresh: 'm-0',
  },
  variants: {
    active: {
      true: {
        chip: 'bg-transparent text-[var(--fuel-primary-foreground)]',
        count: 'text-[var(--fuel-primary-foreground)]',
      },
      false: {
        chip: 'bg-transparent text-[var(--fuel-element-mid-em)] hover:bg-[var(--fuel-muted)] hover:text-heading',
        count: 'text-[var(--fuel-element-low-em)]',
      },
    },
    failed: { true: {} },
    first: {
      true: { chip: 'border-l-0' },
      // Chips that arrive with the data fade in.
      false: { chip: 'fuel-appear' },
    },
  },
  compoundVariants: [
    {
      failed: true,
      active: false,
      class: { count: 'text-[var(--fuel-danger-text)]' },
    },
  ],
});
