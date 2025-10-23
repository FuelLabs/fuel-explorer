import { Button, Text, VStack } from '@fuels/ui';
import type { BN } from 'fuels';
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
  return (
    <form className="flex flex-col flex-1 gap-8">
      <VStack gap="8" justify="center" className="flex-1">
        <VStack gap="0">
          <Text className="font-medium text-gray-12 mb-1">
            How much would you like to undelegate?
          </Text>
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
        variant="solid"
        color="green"
        size="4"
        className="w-full font-medium text-[0.8125rem] leading-[20px]"
        disabled={!isReady || !amount?.gt(0) || !!errorMsg}
        onClick={goToReview}
        type="button"
        isLoading={isGettingReviewDetails}
      >
        {errorMsg ? errorMsg : 'Review →'}
      </Button>
    </form>
  );
}
