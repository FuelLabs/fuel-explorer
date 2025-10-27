import { Button, Flex, Text, VStack } from '@fuels/ui';
import { type Option, SearchableSelect } from '@fuels/ui';
import { IconChevronDown } from '@tabler/icons-react';
import type { BN } from 'fuels';
import { useCallback, useMemo } from 'react';
import type { UseControllerReturn } from 'react-hook-form';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';
import type { Validator } from '~staking/systems/Staking/types/validators';
import type { RedelegateFormValues } from '../../hooks/useRedelegateForm';
import type { ValidatorItem } from '../../hooks/useValidatorsList';
import { getValidatorImage } from '../../utils/validatorImages';
import { RedelegateInput } from './RedelegateInput';

interface RedelegateAmountProps {
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
  validators: ValidatorItem[];
  toValidatorController: UseControllerReturn<
    RedelegateFormValues,
    'toValidator'
  >;
  toValidatorData?: Validator;
}

export function RedelegateAmount({
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
  validators,
  toValidatorController,
  toValidatorData,
}: RedelegateAmountProps) {
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
      toValidatorController.field.onChange(option.value);
    },
    [toValidatorController.field],
  );

  const selectedValidatorOption = useMemo(() => {
    if (!toValidatorData) return undefined;

    return {
      label: toValidatorData.description?.moniker || '',
      value: toValidatorData.operator_address || '',
      commission: Number.parseFloat(
        toValidatorData.commission?.commission_rates?.rate || '0',
      ).toFixed(2),
      votingPower: toValidatorData?.commission?.commission_rates?.rate || '0',
      image: getValidatorImage(toValidatorData?.description?.moniker),
    };
  }, [toValidatorData]);

  return (
    <form className="flex flex-col flex-1 gap-8">
      <VStack gap="8" justify="center" className="flex-1">
        <VStack gap="0">
          <Text className="font-medium text-gray-12 mb-1">
            How much would you like to redelegate?
          </Text>
          <RedelegateInput
            amount={amount}
            stakedAmount={stakedAmount}
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
            endAdornment={
              <Flex className="align-center mx-auto">
                <IconChevronDown size={20} color="white" />
              </Flex>
            }
            className="font-medium text-[0.9375rem] leading-[24px]"
            value=""
            options={validatorOptions}
            onChange={toValidatorController.field.onChange}
            onSelectOption={handleSelectValidator}
            selectedOption={selectedValidatorOption}
          />
          <AnimatedError
            error={toValidatorController.fieldState.error?.message}
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
