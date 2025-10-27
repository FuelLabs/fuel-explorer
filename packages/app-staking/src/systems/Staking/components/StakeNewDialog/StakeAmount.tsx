import { Button, Text, VStack } from '@fuels/ui';
import { type Option, SearchableSelect } from '@fuels/ui';
import type { BN } from 'fuels';
import { useCallback, useMemo } from 'react';
import type { UseControllerReturn } from 'react-hook-form';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import type { Validator } from '~staking/systems/Staking/types/validators';
import type { StakeFormValues } from '../../hooks/useStakeForm';
import type { ValidatorItem } from '../../hooks/useValidatorsList';
import { getValidatorImage } from '../../utils/validatorImages';
import { StakeInput } from './StakeInput';

interface StakeAmountProps {
  isReady: boolean;
  amount: BN | null;
  totalBalance: BN | undefined;
  decimals: number;
  symbol: string;
  onAmountChange: (value: BN | null) => void;
  goToReview: () => void;
  errorMsg?: string | null;
  isGettingReviewDetails?: boolean;
  rates?: AssetRate[];
  validators: ValidatorItem[];
  validatorController: UseControllerReturn<StakeFormValues, 'validator'>;
  validatorData?: Validator;
}

export function StakeAmount({
  isReady,
  amount,
  totalBalance,
  decimals,
  symbol,
  onAmountChange,
  goToReview,
  errorMsg,
  isGettingReviewDetails,
  rates,
  validators,
  validatorController,
  validatorData,
}: StakeAmountProps) {
  const validatorOptions = useMemo(() => {
    return (
      validators?.map((validator) => ({
        label: validator.description.moniker,
        value: validator.operator_address,
        commission: Number.parseFloat(
          validator.commission?.commission_rates?.rate || '0',
        ).toFixed(2),
        votingPower: validator?.commission?.commission_rates?.rate || '0',
        image: getValidatorImage(validator?.description?.moniker),
      })) || []
    );
  }, [validators]);

  const handleSelectValidator = useCallback(
    (option: Option) => {
      validatorController.field.onChange(option.value);
    },
    [validatorController.field],
  );

  const selectedValidatorOption = useMemo(() => {
    if (!validatorData) return undefined;

    return {
      label: validatorData.description?.moniker || '',
      value: validatorData.operator_address || '',
      commission: Number.parseFloat(
        validatorData.commission?.commission_rates?.rate || '0',
      ).toFixed(2),
      votingPower: validatorData?.commission?.commission_rates?.rate || '0',
      image: getValidatorImage(validatorData?.description?.moniker),
    };
  }, [validatorData]);

  return (
    <form className="flex flex-col flex-1 gap-8">
      <VStack gap="8" justify="center" className="flex-1">
        <VStack gap="0">
          <Text className="font-medium text-gray-12 mb-1">
            How much would you like to stake?
          </Text>
          <StakeInput
            amount={amount}
            balance={totalBalance}
            decimals={decimals}
            symbol={symbol}
            error={errorMsg}
            handleChange={onAmountChange}
            rates={rates}
          />
        </VStack>
        <VStack gap="2">
          <Text className="font-medium text-[0.9375rem] text-gray-12 leading-[24px] mt-2">
            To which validator?
          </Text>
          <SearchableSelect
            placeholder="Search or select validator"
            className="font-medium text-[0.9375rem] leading-[24px]"
            value=""
            options={validatorOptions}
            onChange={validatorController.field.onChange}
            onSelectOption={handleSelectValidator}
            selectedOption={selectedValidatorOption}
          />
          <AnimatedError
            error={validatorController.fieldState.error?.message}
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
