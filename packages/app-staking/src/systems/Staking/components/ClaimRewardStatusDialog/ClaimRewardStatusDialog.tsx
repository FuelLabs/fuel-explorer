import { FuelToken, TOKENS } from 'app-commons';
import { bn } from 'fuels';
import { useTranslation } from 'react-i18next';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import { formatETA } from '~staking/systems/Core/utils/eta';
import { useClaimRewardStatusDialog } from '~staking/systems/Staking/hooks/useClaimRewardStatusDialog';
import { useClaimRewardStatusFlags } from '~staking/systems/Staking/hooks/useClaimRewardStatusFlags';
import { StatusItem } from '../StatusItem/StatusItem';
import { type StatusKind, StatusLayout } from '../StatusLayout/StatusLayout';
import { CLAIM_STEPS } from './constants';

type ClaimRewardStatusDialogProps = {
  identifier: string | undefined;
};
const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

const ClaimRewardStatusDialogContent = ({
  identifier,
}: { identifier: string }) => {
  const { t } = useTranslation();

  const {
    claimEvent,
    error,
    isPaused,
    isFinalized,
    isError,
    isLoading,
    dateFinalized,
    rates,
  } = useClaimRewardStatusDialog({
    identifier,
  });
  const amount = bn(claimEvent?.amount, 10);

  const { formattedAmount, originalAmount, tooltipAmount, formattedAmountUsd } =
    useFormattedTokenAmount({
      amount,
      decimals,
      symbol,
      rates,
    });

  const { statusFlags } = useClaimRewardStatusFlags(claimEvent);

  const currentTime = new Date();
  const eta = claimEvent?.timestampToFinish;
  const formattedEta = formatETA(eta);

  const isSkipped = claimEvent?.status === 'Skipped';

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
      describedBy="ClaimReward"
      title={t('staking.dialog.claim_rewards')}
      label={
        isFinalized
          ? t('staking.dialog.have_claimed')
          : t('staking.dialog.claiming_now')
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
        isFinalized ? t('staking.status.rewards_claimed_on') : undefined
      }
      finalizedAt={dateFinalized}
      minHeightClass="tablet:min-h-[350px]"
    >
      {CLAIM_STEPS.filter((step) => {
        if (step.status === 'Skipped') {
          return claimEvent?.status === 'Skipped';
        }
        return true;
      }).map((step) => {
        const isCompleted =
          !!statusFlags[step.status as keyof typeof statusFlags];

        const isCurrent = step.status === claimEvent?.status;
        const txHash = (claimEvent?.statusInfo as any)?.[step.status]?.ethTx
          ?.txHash;

        const isActionNeeded = false; // In claim process, no action is needed
        const isProcessing =
          isCurrent && !isError && !isActionNeeded && !isCompleted;

        return (
          <StatusItem
            key={step.status}
            step={step}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
            statusInfo={claimEvent?.statusInfo}
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
export const ClaimRewardStatusDialog = ({
  identifier,
}: ClaimRewardStatusDialogProps) =>
  identifier ? (
    <ClaimRewardStatusDialogContent identifier={identifier} />
  ) : null;
