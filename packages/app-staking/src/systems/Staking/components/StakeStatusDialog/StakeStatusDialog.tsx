import { FuelToken, TOKENS } from 'app-commons';
import { bn } from 'fuels';
import { useTranslation } from 'react-i18next';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import { formatETA } from '~staking/systems/Core/utils/eta';
import { useStakeStatusDialog } from '~staking/systems/Staking/hooks/useStakeStatusDialog';
import { useStakeStatusFlags } from '~staking/systems/Staking/hooks/useStakeStatusFlags';
import { StatusItem } from '../StatusItem/StatusItem';
import { type StatusKind, StatusLayout } from '../StatusLayout/StatusLayout';
import { STAKE_STEPS } from './constants';

type StakeStatusDialogProps = {
  identifier: string | undefined;
};
const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

const StakeStatusDialogContent = ({ identifier }: { identifier: string }) => {
  const { t } = useTranslation();

  const {
    stakeEvent,
    error,
    isPaused,
    isFinalized,
    isError,
    isLoading,
    dateFinalized,
    rates,
  } = useStakeStatusDialog({
    identifier,
  });
  const amount = bn(stakeEvent?.amount, 10);

  const { formattedAmount, originalAmount, tooltipAmount, formattedAmountUsd } =
    useFormattedTokenAmount({
      amount,
      decimals,
      symbol,
      rates,
    });

  const { statusFlags } = useStakeStatusFlags(stakeEvent);

  const currentTime = new Date();
  const eta = stakeEvent?.timestampToFinish;
  const formattedEta = formatETA(eta);

  const isSkipped = stakeEvent?.status === 'Skipped';

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
      describedBy="Stake"
      title={t('staking.dialog.stake')}
      label={
        isFinalized
          ? t('staking.dialog.have_staked')
          : t('staking.dialog.staking_now')
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
        isFinalized ? t('staking.status.funds_staked_on') : undefined
      }
      finalizedAt={dateFinalized}
      minHeightClass="tablet:min-h-[450px]"
    >
      {STAKE_STEPS.filter((step) => {
        if (step.status === 'Skipped') {
          return stakeEvent?.status === 'Skipped';
        }
        return true;
      }).map((step) => {
        const isCompleted =
          !!statusFlags[step.status as keyof typeof statusFlags];

        const isCurrent = step.status === stakeEvent?.status;
        const txHash = (stakeEvent?.statusInfo as any)?.[step.status]?.ethTx
          ?.txHash;

        const isActionNeeded = false; // In stake process, no action is needed
        const isProcessing =
          isCurrent && !isError && !isActionNeeded && !isCompleted;

        return (
          <StatusItem
            key={step.status}
            step={step}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
            statusInfo={stakeEvent?.statusInfo}
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
export const StakeStatusDialog = ({ identifier }: StakeStatusDialogProps) =>
  identifier ? <StakeStatusDialogContent identifier={identifier} /> : null;
