import {
  AnimatedDialog,
  Copyable,
  LoadingBox,
  LoadingWrapper,
  VStack,
} from '@fuels/ui';
import { formatDateTime } from 'app-commons';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { responsiveDialogStyles } from '~staking/systems/Staking/constants/styles/dialogContent';
import { AmountHero } from '../ReviewLayout/ReviewLayout';
import {
  StatusMarker,
  type StatusMarkerKind,
} from '../StatusMarker/StatusMarker';

export type StatusKind =
  | 'error'
  | 'failed'
  | 'completed'
  | 'action'
  | 'progress';

const MARKER: Record<StatusKind, StatusMarkerKind> = {
  error: 'error',
  failed: 'error',
  completed: 'done',
  action: 'action',
  progress: 'pending',
};

type StatusLayoutProps = {
  describedBy: string;
  title: string;
  label: string;
  symbol: string;
  amount: string;
  fullAmount?: string;
  usd: string;
  isLoading: boolean;
  statusKind: StatusKind;
  statusText: string;
  /** The step rows. */
  children: ReactNode;
  error?: string | null;
  /** Extra content under the steps: a paused notice or a finalize button. */
  extra?: ReactNode;
  eta?: string;
  finalizedLabel?: string;
  finalizedAt?: string | Date | null;
  minHeightClass: string;
};

// The one layout the five status dialogs share: the amount, the status mark,
// the step rows and the closing facts.
export function StatusLayout({
  describedBy,
  title,
  label,
  symbol,
  amount,
  fullAmount,
  usd,
  isLoading,
  statusKind,
  statusText,
  children,
  error,
  extra,
  eta,
  finalizedLabel,
  finalizedAt,
  minHeightClass,
}: StatusLayoutProps) {
  const { t, i18n } = useTranslation();
  const style = responsiveDialogStyles();
  const finalizedDate = finalizedAt ? new Date(finalizedAt) : null;
  const facts = [
    eta
      ? { key: 'eta', label: t('staking.status.eta'), value: eta }
      : undefined,
    finalizedDate && !Number.isNaN(finalizedDate.getTime()) && finalizedLabel
      ? {
          key: 'done',
          label: finalizedLabel,
          value: formatDateTime(finalizedDate, 'long', i18n.language),
        }
      : undefined,
  ].filter((fact): fact is NonNullable<typeof fact> => !!fact);

  return (
    <AnimatedDialog.Content
      open
      aria-describedby={describedBy}
      className={style.content({
        sizing: 'auto',
        // Grows with its content (a failed step adds a long message) and
        // scrolls only when taller than the screen, so nothing is cropped.
        className: minHeightClass,
      })}
    >
      <VStack className="h-full" gap="7">
        <AnimatedDialog.Title>{title}</AnimatedDialog.Title>
        <div className="flex flex-col">
          <AmountHero
            label={label}
            symbol={symbol}
            amount={amount}
            fullAmount={fullAmount}
            usd={usd}
            isLoading={isLoading}
          />
          <div className="flex items-center gap-3 border-t border-[var(--fuel-border)] py-4">
            <span className="fuel-label">{t('staking.status.label')}</span>
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="h-4 w-20 !rounded-none" />}
              regularEl={
                <span className="fuel-appear flex items-center gap-2">
                  <StatusMarker kind={MARKER[statusKind]} />
                  <span className="fuel-label text-[var(--fuel-element-high-em)]">
                    {statusText}
                  </span>
                </span>
              }
            />
          </div>
          <div className="flex flex-col border-t border-[var(--fuel-border)]">
            {children}
          </div>
          {!!error && (
            <div className="fuel-appear flex items-start gap-3 border-t border-[var(--fuel-border)] py-4">
              <StatusMarker kind="error" className="mt-[5px]" />
              <Copyable
                as="div"
                className="max-h-[150px] overflow-hidden"
                value={error}
                iconClassName="mr-1"
              >
                <span className="block max-h-[120px] overflow-hidden break-words text-[14px] leading-[18px] text-[var(--fuel-danger-text)]">
                  {error}
                </span>
              </Copyable>
            </div>
          )}
          {extra && (
            <div className="flex flex-col gap-3 border-t border-[var(--fuel-border)] py-4">
              {extra}
            </div>
          )}
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={
              <div className="border-t border-[var(--fuel-border)] py-4">
                <LoadingBox className="h-5 w-48 !rounded-none" />
              </div>
            }
            regularEl={facts.map((fact) => (
              <div
                key={fact.key}
                className="fuel-appear flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-[var(--fuel-border)] py-4"
              >
                <span className="fuel-label">{fact.label}</span>
                <span className="text-[14px] font-medium text-heading">
                  {fact.value}
                </span>
              </div>
            ))}
          />
        </div>
      </VStack>
    </AnimatedDialog.Content>
  );
}
