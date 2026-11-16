import {
  Address as AddressUi,
  IconCheck,
  LoadingBox,
  LoadingWrapper,
} from '@fuels/ui';
import { motion, useReducedMotion } from 'framer-motion';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatETA } from '~staking/systems/Core/utils/eta';
import { getTransactionLink } from '~staking/systems/Core/utils/getTransactionLink';
import { EASE_OUT } from '~staking/systems/Core/utils/motion';
import {
  StatusMarker,
  type StatusMarkerKind,
} from '../StatusMarker/StatusMarker';
import type { StakingStatusDialogStepProps } from './types';

const MARKER_LABEL: Record<StatusMarkerKind, string> = {
  done: 'staking.status.step_done',
  active: 'staking.status.step_active',
  action: 'staking.status.step_active',
  error: 'staking.status.step_failed',
  pending: 'staking.status.step_pending',
};

export const StatusItem = memo(function StatusItem({
  step,
  isCompleted,
  isCurrent,
  statusInfo,
  eta,
  isContractPaused,
  isLoading,
  txHash,
  isActionNeeded,
  isProcessing,
}: StakingStatusDialogStepProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const formattedEta = formatETA(eta);

  const isError = !!statusInfo?.Error?.error;
  const isSkipped = !!statusInfo?.Skipped;

  let marker: StatusMarkerKind = 'pending';
  if (isCurrent && (isError || isSkipped)) marker = 'error';
  else if (isCompleted) marker = 'done';
  else if (isCurrent || isProcessing) marker = 'active';

  return (
    <div
      aria-current={isCurrent ? 'step' : undefined}
      className={`relative flex w-full items-start justify-between gap-3 py-3 pl-4 pr-1 ${
        isCurrent ? 'text-heading' : 'text-[var(--fuel-element-low-em)]'
      }`}
    >
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-px origin-top bg-[var(--fuel-primary)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          isCurrent ? 'scale-y-100' : 'scale-y-0'
        }`}
      />
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className="flex h-[18px] shrink-0 items-center">
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="size-2 !rounded-none" />}
            regularEl={
              <>
                <StatusMarker kind={marker} />
                <span className="sr-only">{t(MARKER_LABEL[marker])}</span>
              </>
            }
          />
        </span>
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="h-5 w-40 !rounded-none" />}
          regularEl={
            <div className="flex min-w-0 flex-col gap-1">
              <span className="flex items-center gap-2">
                <span
                  className={`text-[14px] leading-[18px] ${
                    isCurrent ? 'font-medium' : ''
                  }`}
                >
                  {t(step.label)}
                </span>
                {isCompleted && (
                  <motion.span
                    initial={{ scale: reduced ? 1 : 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="flex text-[var(--fuel-brand-text)]"
                  >
                    <IconCheck size={14} />
                  </motion.span>
                )}
              </span>
              {isCurrent && step.description && (
                <span className="break-words text-[12px] leading-[18px] text-[var(--fuel-element-low-em)]">
                  {step.description}
                </span>
              )}
            </div>
          }
        />
      </div>
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={null}
        regularEl={
          <div className="fuel-appear flex items-center justify-end gap-2">
            {isCurrent && formattedEta && (
              <span className="fuel-label">{formattedEta}</span>
            )}
            {txHash && (
              <AddressUi
                value={txHash}
                hideCopyable
                linkProps={{
                  href: getTransactionLink(txHash, 'l1'),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }}
              />
            )}
            {isActionNeeded && !isContractPaused && (
              <span className="fuel-label text-[var(--fuel-element-high-em)]">
                {t('staking.board.action_needed')}
              </span>
            )}
          </div>
        }
      />
    </div>
  );
});
