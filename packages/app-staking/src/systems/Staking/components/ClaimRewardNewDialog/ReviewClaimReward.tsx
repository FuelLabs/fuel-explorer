import { LoadingBox, LoadingWrapper, convertToUsd } from '@fuels/ui';
import { BN } from 'fuels';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import {
  formatAmount,
  truncateToIntegerString,
} from '~staking/systems/Core/utils/bn';
import { useValidator } from '../../services/useValidator';
import { useValidatorRewards } from '../../services/useValidatorRewards/useValidatorRewards';
import {
  AccountRow,
  NetworkFeeRow,
  ReviewLayout,
  ValidatorRow,
} from '../ReviewLayout/ReviewLayout';

interface Props {
  decimals: number;
  symbol: string;
  errorMsg?: string | null;
  isSubmitting: boolean;
  isReady: boolean;
  fee: BN;
  rates: AssetRate[];
  isGettingReviewDetails: boolean;
  onConfirm: () => void;
  validator: SequencerValidatorAddress;
  isBlocked?: boolean;
  blockingMessage?: string;
}

function _ReviewClaimReward({
  decimals,
  symbol,
  errorMsg,
  isSubmitting,
  isReady,
  fee = new BN(0),
  rates = [],
  onConfirm,
  isGettingReviewDetails,
  validator,
  isBlocked = false,
  blockingMessage,
}: Props) {
  const { t } = useTranslation();
  const { validator: validatorData, isLoading: isLoadingValidatorData } =
    useValidator(validator);
  const { address } = useAccount();
  const { data: rewardsData } = useValidatorRewards(validator, address, {
    select: ({ rewards }) => rewards,
  });
  const rewardBN = useMemo(() => {
    return rewardsData?.reduce((acc, curr) => {
      // Cosmos API returns decimal strings - truncate to integer for BN
      const integerAmount = truncateToIntegerString(curr.amount);
      return acc.add(new BN(integerAmount));
    }, new BN(0));
  }, [rewardsData]);
  const ratesData = useMemo(() => {
    const tokenRate = rates?.find(
      (rate) => rate.symbol.toLowerCase() === symbol.toLowerCase(),
    );

    const ethRate = rates?.find((rate) => rate.symbol.toLowerCase() === 'eth');

    return {
      token: tokenRate?.rate || 0,
      eth: ethRate?.rate || 0,
    };
  }, [rates, symbol]);

  const {
    formatted: formattedAmount,
    original: originalAmount,
    tooltip: tooltipAmount,
  } = useMemo(() => {
    return formatAmount(rewardBN, decimals);
  }, [rewardBN, decimals]);

  const { formatted: formattedAmountUsd } = useMemo(() => {
    return convertToUsd(rewardBN || new BN(0), decimals, ratesData.token);
  }, [rewardBN, decimals, ratesData.token]);

  return (
    <ReviewLayout
      label={t('staking.dialog.amount_to_claim')}
      symbol={symbol}
      amount={formattedAmount.display}
      fullAmount={tooltipAmount ? originalAmount.display : undefined}
      usd={
        <LoadingWrapper
          isLoading={isGettingReviewDetails}
          loadingEl={<LoadingBox className="h-5 w-20 !rounded-none" />}
          regularEl={`(${formattedAmountUsd})`}
        />
      }
      warning={
        isBlocked
          ? {
              title: t('staking.dialog.claim_pending'),
              message: blockingMessage,
            }
          : undefined
      }
      error={errorMsg}
      confirmLabel={t('staking.dialog.claim_rewards')}
      onConfirm={onConfirm}
      isConfirmDisabled={!isReady || isBlocked || isGettingReviewDetails}
      isLoading={isSubmitting || isGettingReviewDetails}
      loadingText={
        isGettingReviewDetails
          ? t('staking.review.checking')
          : t('staking.review.submitting')
      }
      confirmTitle={isBlocked ? blockingMessage : ''}
    >
      <ValidatorRow
        header={t('staking.review.from')}
        moniker={validatorData?.description?.moniker}
        isLoading={isLoadingValidatorData}
      />
      <AccountRow header={t('staking.review.to')} kind="sequencer" />
      <NetworkFeeRow
        fee={fee}
        ethRate={ratesData.eth}
        isLoading={isGettingReviewDetails}
      />
    </ReviewLayout>
  );
}

export const ReviewClaimReward = memo(_ReviewClaimReward);
