import { BN } from 'fuels';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RegularInfoSection } from '~staking/systems/Core/components/RegularInfoSection/RegularInfoSection';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import type { Validator } from '../../types/validators';
import {
  AccountRow,
  NetworkFeeRow,
  ReviewLayout,
  ValidatorRow,
} from '../ReviewLayout/ReviewLayout';

interface Props {
  amount: BN | null;
  decimals: number;
  symbol: string;
  errorMsg?: string | null;
  isSubmitting: boolean;
  isReady: boolean;
  fee: BN;
  rates: AssetRate[];
  isGettingReviewDetails: boolean;
  onConfirm: () => void;
  onBack: () => void;
  validator?: Validator;
  isBlocked?: boolean;
  blockingMessage?: string;
  finalizationPeriod?: string;
}

function _ReviewUndelegate({
  amount,
  decimals,
  symbol,
  errorMsg,
  isSubmitting,
  isReady,
  fee = new BN(0),
  rates = [],
  onConfirm,
  isGettingReviewDetails,
  onBack,
  validator,
  isBlocked = false,
  blockingMessage,
  finalizationPeriod,
}: Props) {
  const { t } = useTranslation();
  const {
    formattedAmount,
    originalAmount,
    tooltipAmount,
    formattedAmountUsd,
    ratesData,
  } = useFormattedTokenAmount({
    amount,
    decimals,
    symbol,
    rates,
  });

  return (
    <ReviewLayout
      label={t('staking.dialog.undelegating_now')}
      symbol={symbol}
      amount={formattedAmount.display}
      fullAmount={tooltipAmount ? originalAmount.display : undefined}
      usd={`(${formattedAmountUsd})`}
      warning={
        isBlocked
          ? {
              title: t('staking.dialog.undelegate_unavailable'),
              message: blockingMessage,
            }
          : undefined
      }
      error={errorMsg}
      onBack={onBack}
      isBackDisabled={isSubmitting}
      confirmLabel={t('staking.dialog.submit_undelegate')}
      onConfirm={onConfirm}
      isConfirmDisabled={!isReady || isBlocked || isGettingReviewDetails}
      isLoading={isSubmitting || isGettingReviewDetails}
      loadingText={
        isGettingReviewDetails
          ? t('staking.review.checking')
          : t('staking.review.submitting')
      }
    >
      <ValidatorRow
        header={t('staking.review.from')}
        moniker={validator?.description?.moniker}
      />
      <AccountRow header={t('staking.review.to')} kind="sequencer" />
      <NetworkFeeRow
        fee={fee}
        ethRate={ratesData.eth}
        isLoading={isGettingReviewDetails}
      />
      {finalizationPeriod && (
        <RegularInfoSection
          header={t('staking.review.time_to_complete')}
          text={finalizationPeriod}
        />
      )}
    </ReviewLayout>
  );
}

export const ReviewUndelegate = memo(_ReviewUndelegate);
