import { FuelToken, TOKENS } from 'app-commons';
import { bn } from 'fuels';
import { useTranslation } from 'react-i18next';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import { formatETA } from '~staking/systems/Core/utils/eta';
import { useUndelegateStatusDialog } from '~staking/systems/Staking/hooks/useUndelegateStatusDialog';
import { useUndelegateStatusFlags } from '../../hooks/useUndelegateStatusFlags';
import { StatusItem } from '../StatusItem/StatusItem';
import { type StatusKind, StatusLayout } from '../StatusLayout/StatusLayout';
import { UNDELEGATE_STEPS } from './constants';

type UndelegateStatusDialogProps = {
  identifier: string | undefined;
};
const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

const UndelegateStatusDialogContent = ({
  identifier,
}: { identifier: string }) => {
  const { t } = useTranslation();

  const {
    undelegateEvent,
    error,
    isPaused,
    isFinalized,
    isError,
    isLoading,
    dateFinalized,
    rates,
  } = useUndelegateStatusDialog({
    identifier,
  });
  const amount = bn(undelegateEvent?.amount, 10);

  const { formattedAmount, originalAmount, tooltipAmount, formattedAmountUsd } =
    useFormattedTokenAmount({
      amount,
      decimals,
      symbol,
      rates,
    });

  const { statusFlags } = useUndelegateStatusFlags(undelegateEvent);

  const currentTime = new Date();
  const eta = undelegateEvent?.timestampToFinish;
  const formattedEta = formatETA(eta);

  const isSkipped = undelegateEvent?.status === 'Skipped';

  const statusKind: StatusKind = (() => {
    if (error) return 'error';
    if (isSkipped) return 'failed';
    if (isFinalized) return 'completed';
    return 'progress';
  })();

  const statusText = error
    ? t('staking.status.error')
    : isSkipped
      ? t('staking.history.status_failed')
      : isFinalized
        ? t('staking.history.status_completed')
        : t('staking.history.status_progress');

  return (
    <StatusLayout
      describedBy="Undelegate"
      title={t('staking.dialog.undelegate')}
      label={
        isFinalized
          ? t('staking.dialog.have_undelegated')
          : t('staking.dialog.undelegating_now')
      }
      symbol={symbol}
      amount={formattedAmount.display}
      fullAmount={tooltipAmount ? originalAmount.display : undefined}
      usd={`(${formattedAmountUsd})`}
      isLoading={isLoading}
      statusKind={statusKind}
      statusText={statusText}
      error={isError ? error : undefined}
      eta={formattedEta}
      finalizedLabel={
        isFinalized ? t('staking.status.undelegation_completed_on') : undefined
      }
      finalizedAt={dateFinalized}
      minHeightClass="tablet:min-h-[450px]"
    >
      {UNDELEGATE_STEPS.filter((step) => {
        if (step.status === 'Skipped') {
          return undelegateEvent?.status === 'Skipped';
        }
        return true;
      }).map((step) => {
        const isCompleted =
          !!statusFlags[step.status as keyof typeof statusFlags];

        const isCurrent = step.status === undelegateEvent?.status;
        const txHash = (undelegateEvent?.statusInfo as any)?.[step.status]
          ?.ethTx?.txHash;

        const isActionNeeded = false; // In undelegate process, no action is needed
        const isProcessing =
          isCurrent && !isError && !isActionNeeded && !isCompleted;

        return (
          <StatusItem
            key={step.status}
            step={step}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
            statusInfo={undelegateEvent?.statusInfo}
            currentTime={currentTime}
            eta={eta}
            isContractPaused={!!isPaused}
            isLoading={isLoading}
            txHash={txHash}
            isActionNeeded={isActionNeeded}
            isProcessing={isProcessing}
          />
        );
      })}
    </StatusLayout>
  );
};

// Hooks cannot sit below an early return, so the dialog body mounts only
// once there is an identifier.
export const UndelegateStatusDialog = ({
  identifier,
}: UndelegateStatusDialogProps) =>
  identifier ? <UndelegateStatusDialogContent identifier={identifier} /> : null;
