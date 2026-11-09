import { Button, IconArrowRight, VStack } from '@fuels/ui';
import type { BN } from 'fuels';
import { useTranslation } from 'react-i18next';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import { UndelegateInput } from './UndelegateInput';

interface UndelegateAmountProps {
  isReady: boolean;
  amount: BN | null;
  stakedAmount: BN | undefined;
  decimals: number;
  symbol: string;
  onAmountChange: (value: BN | null) => void;
  goToReview: () => void;
  errorMsg?: string | null;
  isGettingReviewDetails?: boolean;
  rates?: AssetRate[];
}

export function UndelegateAmount({
  isReady,
  amount,
  stakedAmount,
  decimals,
  symbol,
  onAmountChange,
  goToReview,
  errorMsg,
  isGettingReviewDetails,
  rates,
}: UndelegateAmountProps) {
  const { t } = useTranslation();
  return (
    <form className="flex flex-col flex-1 gap-8">
      <VStack gap="8" justify="center" className="flex-1">
        <VStack gap="0">
          <span className="fuel-label mb-2">
            {t('staking.dialog.how_much_undelegate')}
          </span>
          <UndelegateInput
            amount={amount}
            stakedAmount={stakedAmount}
            decimals={decimals}
            symbol={symbol}
            error={errorMsg}
            handleChange={onAmountChange}
            rates={rates}
          />
        </VStack>
      </VStack>

      <Button
        size="3"
        className="w-full"
        disabled={!isReady || !amount?.gt(0) || !!errorMsg}
        onClick={goToReview}
        type="button"
        isLoading={isGettingReviewDetails}
        rightIcon={errorMsg ? undefined : IconArrowRight}
      >
        {errorMsg ? errorMsg : t('staking.dialog.review')}
      </Button>
    </form>
  );
}
