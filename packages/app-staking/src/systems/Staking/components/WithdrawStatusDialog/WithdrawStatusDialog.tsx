import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import { Button } from '@fuels/ui';
import { FuelToken, L1_DISABLE_WITHDRAW, TOKENS } from 'app-commons';
import { bn } from 'fuels';
import { useTranslation } from 'react-i18next';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import { formatETA } from '~staking/systems/Core/utils/eta';
import { PausedContractAlertStaking } from '~staking/systems/Staking/components/PausedContractAlertStaking/PausedContractAlertStaking';
import { useWithdrawStatusDialog } from '~staking/systems/Staking/hooks/useWithdrawStatusDialog';
import { useWithdrawStatusFlags } from '~staking/systems/Staking/hooks/useWithdrawStatusFlags';
import { StatusItem } from '../StatusItem/StatusItem';
import { type StatusKind, StatusLayout } from '../StatusLayout/StatusLayout';
import { WITHDRAW_STEPS } from './constants';

type WithdrawStatusDialogProps = {
  identifier: string | undefined;
};
const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

export const WithdrawStatusDialog = ({
  identifier,
}: WithdrawStatusDialogProps) => {
  if (!identifier) return null;
  const { t } = useTranslation();

  const {
    stakingEvent,
    error,
    isPaused,
    isFinalizing,
    isFinalized,
    isError,
    finalize,
    isLoading,
    dateFinalized,
    isWaitingForReceipt,
    rates,
  } = useWithdrawStatusDialog({
    identifier,
  });
  const amount = bn(stakingEvent?.amount, 10);

  const { formattedAmount, originalAmount, tooltipAmount, formattedAmountUsd } =
    useFormattedTokenAmount({
      amount,
      decimals,
      symbol,
      rates,
    });

  const { statusFlags } = useWithdrawStatusFlags(stakingEvent);
  const currentTime = new Date();
  const eta = stakingEvent?.timestampToFinish;
  const formattedEta = formatETA(eta);

  if (L1_DISABLE_WITHDRAW === 'true') return null;

  const isSkipped = stakingEvent?.status === GQLWithdrawStatusType.Skipped;

  const statusKind: StatusKind = (() => {
    if (error) return 'error';
    if (isSkipped) return 'failed';
    if (isFinalized) return 'completed';
    if (statusFlags.WaitingFinalization) return 'action';
    return 'progress';
  })();

  const statusText = error
    ? t('staking.status.error')
    : isSkipped
      ? t('staking.history.status_failed')
      : isFinalized
        ? t('staking.history.status_completed')
        : statusFlags.WaitingFinalization
          ? t('staking.status.waiting_user')
          : t('staking.history.status_progress');

  return (
    <StatusLayout
      describedBy="Withdraw"
      title={t('staking.dialog.withdrawal')}
      label={
        isFinalized
          ? t('staking.dialog.have_withdrawn')
          : t('staking.dialog.withdrawing_now')
      }
      symbol={symbol}
      amount={formattedAmount.display}
      fullAmount={tooltipAmount ? originalAmount.display : undefined}
      usd={`(${formattedAmountUsd})`}
      isLoading={isLoading}
      statusKind={statusKind}
      statusText={statusText}
      error={isError ? error : undefined}
      extra={
        <>
          {!!isPaused && <PausedContractAlertStaking />}
          {!isPaused &&
            stakingEvent?.status ===
              GQLWithdrawStatusType.ReadyToProcessWithdraw && (
              <Button
                onClick={finalize}
                isLoading={isFinalizing || isWaitingForReceipt}
                loadingText={
                  isWaitingForReceipt
                    ? t('staking.status.waiting_confirmation')
                    : t('staking.status.loading')
                }
              >
                {t('staking.status.finalize_withdraw')}
              </Button>
            )}
        </>
      }
      eta={formattedEta}
      finalizedLabel={
        isFinalized ? t('staking.status.withdrawal_finalized_on') : undefined
      }
      finalizedAt={dateFinalized}
      minHeightClass="min-h-[520px]"
    >
      {WITHDRAW_STEPS.filter((step) => {
        if (step.status === GQLWithdrawStatusType.Skipped) {
          return stakingEvent?.status === GQLWithdrawStatusType.Skipped;
        }
        return true;
      }).map((step) => {
        const isCompleted =
          !!statusFlags[step.status as keyof typeof statusFlags];
        const isCurrent = step.status === stakingEvent?.status;
        const isReadyToProcess =
          step.status === GQLWithdrawStatusType.ReadyToProcessWithdraw;
        const eta =
          isCurrent &&
          (stakingEvent?.statusInfo as any)?.[step.status]
            ?.dateExpectedToComplete;
        const txHash =
          (stakingEvent?.statusInfo as any)?.[step.status]?.ethTx?.txHash ||
          (stakingEvent?.statusInfo as any)?.[step.status]?.sequencerTx?.txHash;
        const isActionNeeded =
          isCurrent && isReadyToProcess && !isWaitingForReceipt && !isPaused;
        const isProcessing =
          isCurrent && !isError && !isActionNeeded && !isCompleted;

        return (
          <StatusItem
            key={step.status}
            step={step}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
            statusInfo={stakingEvent?.statusInfo}
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
