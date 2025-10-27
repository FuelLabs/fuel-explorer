import {
  InputAmountMax,
  InputAmountSimple,
  InputAmountToken,
  VStack,
} from '@fuels/ui';

import type { BN } from 'fuels';
import { bn } from 'fuels';
import { useCallback, useMemo } from 'react';
import type { AssetRate } from '~staking/systems/Core/services/AssetsRateService';

interface UndelegateInputProps {
  amount: BN | null;
  stakedAmount: BN | undefined;
  decimals: number;
  symbol: string;
  error?: string | null;
  handleChange: (value: BN | null) => void;
  rates?: AssetRate[];
}

export function UndelegateInput({
  amount,
  stakedAmount,
  decimals,
  symbol,
  error,
  handleChange,
  rates,
}: UndelegateInputProps) {
  const onMax = useCallback(() => {
    if (stakedAmount) {
      handleChange(stakedAmount);
    }
  }, [stakedAmount, handleChange]);

  const safeAmount = useMemo(() => {
    return amount || bn(0);
  }, [amount]);

  // Wrapper function to handle null values
  const handleAmountChange = useCallback(
    (value: BN) => {
      handleChange(value);
    },
    [handleChange],
  );

  return (
    <VStack gap="3">
      <InputAmountSimple
        symbol={symbol}
        image="/assets/fuel.png"
        decimals={decimals}
        value={safeAmount}
        onChange={handleAmountChange}
        error={!!error}
        header={
          <InputAmountMax
            amount={stakedAmount}
            label="Available"
            onMax={onMax}
          />
        }
        startAdornment={<InputAmountToken />}
        rates={rates}
      />
    </VStack>
  );
}
