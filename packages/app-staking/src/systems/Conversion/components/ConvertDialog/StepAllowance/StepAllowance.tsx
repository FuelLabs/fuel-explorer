import {
  Alert,
  AnimatedHeight,
  Button,
  HStack,
  InputAmount,
  LoadingBox,
  LoadingWrapper,
  Separator,
  VStack,
} from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS } from 'app-commons';
import type { BN } from 'fuels';
import { useEffect, useMemo, useState } from 'react';
import { useController } from 'react-hook-form';
import type { Address } from 'viem';
import {
  type StepAllowanceFormValues,
  useStepAllowanceForm,
} from '~staking/systems/Conversion/hooks/useStepAllowanceForm';
import { getShortError } from '~staking/systems/Core';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';
import { bnToBigInt } from '~staking/systems/Core/utils/bn';
import { PausedContractAlertStaking } from '~staking/systems/Staking/components/PausedContractAlertStaking/PausedContractAlertStaking';
import { useTokenApprove } from '~staking/systems/Staking/hooks/useTokenApprove';
import { useTokenAllowance } from '~staking/systems/Staking/services/useTokenAllowance';
import { input } from './StepAllowance.styles';

type StepAllowanceProps = {
  account: Address | undefined;
  token: Address;
  decimals: number;
  balance: BN;
  isContractPaused: boolean;
  onNext: (data: StepAllowanceFormValues) => void;
};

export const StepAllowance = ({
  token,
  decimals,
  account,
  balance,
  isContractPaused,
  onNext,
}: StepAllowanceProps) => {
  const [txHashTokenAllowance, setTxHashTokenAllowance] = useState<
    Address | undefined
  >();

  const { data: tokensAllowance, isLoading } = useTokenAllowance(
    token,
    CURRENT_NETWORK_CONTRACTS.FUEL_TOKEN_MIGRATOR,
    account,
  );

  const { amount: allowance } = useFormatBalance(tokensAllowance, decimals);

  const {
    approve,
    isApproving,
    isWaitingTokenApproval,
    error: errorApproval,
    isApprovalSuccess,
  } = useTokenApprove(txHashTokenAllowance);

  const { handleSubmit, control } = useStepAllowanceForm(balance);

  const amount = useController({
    control,
    name: 'amount',
  });

  const errorMsg = useMemo<string | undefined>(() => {
    if (errorApproval) {
      return getShortError(errorApproval);
    }

    return amount.fieldState.error?.message;
  }, [errorApproval, amount.fieldState.error?.message]);

  const needsApproval = useMemo(
    () =>
      !tokensAllowance ||
      tokensAllowance < bnToBigInt(amount.field.value || '0'),
    [tokensAllowance, amount.field.value],
  );

  const isInvalid =
    !amount.fieldState.isDirty ||
    amount.fieldState.invalid ||
    !amount.field.value;

  useEffect(() => {
    if (needsApproval && isApprovalSuccess) {
      onNext({
        amount: amount.field.value,
      });
    }
  }, [isApprovalSuccess, onNext, amount.field.value, needsApproval]);

  const onSubmit = (data: StepAllowanceFormValues) => {
    const amountBN = data.amount;
    const amount = bnToBigInt(amountBN || '0');
    const requiresApproval = Boolean(
      !tokensAllowance || tokensAllowance < amount,
    );

    if (requiresApproval) {
      approve({
        token,
        spender: CURRENT_NETWORK_CONTRACTS.FUEL_TOKEN_MIGRATOR,
        amount,
        options: {
          onSuccess: (hash) => {
            setTxHashTokenAllowance(hash);
          },
        },
      });
      return;
    }

    onNext({
      amount: data.amount,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
      <VStack gap="0" className="flex-1 mt-8">
        <InputAmount
          balance={balance}
          formatOpts={{
            units: decimals,
            precision: decimals,
          }}
        >
          <InputAmount.Field
            color="green"
            value={amount.field.value}
            onChange={amount.field.onChange}
            className={input({ error: Boolean(errorMsg) })}
            disabled={isContractPaused}
          >
            <InputAmount.ButtonMaxBalance />
          </InputAmount.Field>

          <HStack gap="2" justify="between">
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-36 h-5" />}
              regularEl={
                <InputAmount.Balance
                  color="blue"
                  label="Token Allowance"
                  balance={allowance}
                />
              }
            />
            <LoadingWrapper
              isLoading={!balance}
              loadingEl={<LoadingBox className="w-36 h-5" />}
              regularEl={<InputAmount.Balance label="Available" />}
            />
          </HStack>
        </InputAmount>

        <AnimatedError error={errorMsg} />

        <AnimatedHeight enabled={isWaitingTokenApproval}>
          <Alert variant="outline" color="blue" className="text-xs mt-3">
            Waiting for token allowance confirmation.
            <br />
            You can close this dialog and come back later.
          </Alert>
        </AnimatedHeight>
      </VStack>
      <Separator size="4" className="my-5" />

      {isContractPaused ? (
        <PausedContractAlertStaking />
      ) : (
        <Button
          variant="solid"
          color="green"
          isLoading={
            isApproving ||
            isWaitingTokenApproval ||
            typeof tokensAllowance === 'undefined'
          }
          className="w-full"
          disabled={isInvalid}
        >
          {!needsApproval || isInvalid ? 'Next' : 'Approve'}
        </Button>
      )}
    </form>
  );
};
