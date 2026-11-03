import { FuelToken, TOKENS } from 'app-commons';
import { bn } from 'fuels';
import { useTranslation } from 'react-i18next';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import { formatETA } from '~staking/systems/Core/utils/eta';
import { useRedelegateStatusDialog } from '../../hooks/useRedelegateStatusDialog';
import { useRedelegateStatusFlags } from '../../hooks/useRedelegateStatusFlags';
import { StatusItem } from '../StatusItem/StatusItem';
import { type StatusKind, StatusLayout } from '../StatusLayout/StatusLayout';
import { REDELEGATE_STEPS } from './constants';

type RedelegateStatusDialogProps = {
  identifier: string | undefined;
};
const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

const RedelegateStatusDialogContent = ({
  identifier,
}: { identifier: string }) => {
  const { t } = useTranslation();

  const {
    redelegateEvent,
    error,
    isPaused,
    isFinalized,
    isError,
    isLoading,
    dateFinalized,
    rates,
  } = useRedelegateStatusDialog({
    identifier,
  });
  const amount = bn(redelegateEvent?.amount, 10);

  const { formattedAmount, originalAmount, tooltipAmount, formattedAmountUsd } =
    useFormattedTokenAmount({
      amount,
      decimals,
      symbol,
      rates,
    });

  const { statusFlags } = useRedelegateStatusFlags(redelegateEvent);

  const currentTime = new Date();
  const eta = redelegateEvent?.timestampToFinish;
  const formattedEta = formatETA(eta);

  const isSkipped = redelegateEvent?.status === 'Skipped';

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
      describedBy="Redelegate"
      title={t('staking.dialog.redelegate')}
      label={
        isFinalized
          ? t('staking.dialog.have_redelegated')
          : t('staking.dialog.redelegating_now')
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
        isFinalized ? t('staking.status.redelegated_on') : undefined
      }
      finalizedAt={dateFinalized}
      minHeightClass="tablet:min-h-[450px]"
    >
      {REDELEGATE_STEPS.filter((step) => {
        if (step.status === 'Skipped') {
          return redelegateEvent?.status === 'Skipped';
        }
        return true;
      }).map((step) => {
        const isCompleted =
          !!statusFlags[step.status as keyof typeof statusFlags];

        const isCurrent = step.status === redelegateEvent?.status;
        const txHash = (redelegateEvent?.statusInfo as any)?.[step.status]
          ?.ethTx?.txHash;

        const isActionNeeded = false; // In redelegate process, no action is needed
        const isProcessing =
          isCurrent && !isError && !isActionNeeded && !isCompleted;

        return (
          <StatusItem
            key={step.status}
            step={step}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
            statusInfo={redelegateEvent?.statusInfo}
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
export const RedelegateStatusDialog = ({
  identifier,
}: RedelegateStatusDialogProps) =>
  identifier ? <RedelegateStatusDialogContent identifier={identifier} /> : null;
