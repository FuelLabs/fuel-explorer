import { LoadingBox, LoadingWrapper } from '@fuels/ui';
import {
  InputAmountMax,
  InputAmountRelativeValue,
  InputAmountSimple,
  InputAmountToken,
} from '@fuels/ui';
import { FuelToken, TOKENS } from 'app-commons';
import type { BN } from 'fuels';
import { memo, useCallback } from 'react';

const { symbol, decimals } = TOKENS[FuelToken.V2];

interface InputProps {
  isPaused: boolean;
  amount: BN;
  delegated: BN | null;
  error: string | null;
  handleChange: (amount: BN) => void;
  disabled?: boolean;
  isLoading?: boolean;
  tokenRate: number;
}

function _Input({
  isPaused,
  delegated,
  amount,
  error,
  handleChange,
  disabled = false,
  isLoading = false,
  tokenRate,
}: InputProps) {
  const onMax = useCallback(() => {
    delegated != null && handleChange(delegated);
  }, [handleChange, delegated]);

  return (
    <InputAmountSimple
      symbol={symbol}
      image="/assets/fuel.png"
      decimals={decimals}
      value={amount}
      onChange={handleChange}
      error={!!error}
      header={
        <LoadingWrapper
          isLoading={isLoading}
          regularEl={
            <InputAmountMax
              amount={delegated as BN}
              label="Available"
              onMax={onMax}
            />
          }
          loadingEl={<LoadingBox className="w-40 h-6" />}
        />
      }
      startAdornment={<InputAmountToken />}
      footer={<InputAmountRelativeValue rate={tokenRate ?? 0.01} />}
      disabled={isPaused || disabled}
    />
  );
}

export const Input = memo(_Input);
