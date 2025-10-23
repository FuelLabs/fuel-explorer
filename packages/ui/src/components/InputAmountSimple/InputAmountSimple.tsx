import type { BN } from 'fuels';
import { tv } from 'tailwind-variants';
import { HStack, VStack } from '../Box';
import { InputAmountRelativeValue } from '../InputAmountRelativeValue';
import { InputAmountSimpleProvider } from './InputAmountSimpleContext';
import { InputAmountSimpleField } from './InputAmountSimpleField';

export interface InputAmountSimpleProps {
  decimals: number;
  image: string;
  symbol: string;
  value: BN;
  onChange?: (value: BN) => void;
  header?: React.ReactNode;
  startAdornment: React.ReactNode;
  footer?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rates?: {
    symbol: string;
    rate: number;
  }[];
}

const container = tv({
  base: 'transition-colors w-full',
  variants: {
    error: {
      true: 'border-b border-[--red-8]',
      false: 'border-b border-[--gray-8]',
    },
    readOnly: {
      true: 'border-none',
      false: 'border-b border-solid',
    },
  },
  defaultVariants: {
    error: false,
    readOnly: false,
  },
});

export function InputAmountSimple({
  decimals,
  image,
  symbol,
  value,
  onChange,
  header,
  startAdornment,
  footer,
  error = false,
  disabled = false,
  readOnly = false,
  rates,
}: InputAmountSimpleProps) {
  const rate = rates?.find(
    (rate) => rate.symbol.toLowerCase() === symbol.toLowerCase(),
  )?.rate;

  return (
    <InputAmountSimpleProvider
      decimals={decimals}
      image={image}
      symbol={symbol}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      onChange={onChange}
    >
      <VStack gap="1" align="start" className="w-full">
        {/* Usually the component with max balance */}
        {header}

        <HStack
          gap="2"
          align="center"
          className={container({ error, readOnly })}
        >
          {/* Usually the component with the token icon */}
          {startAdornment}
          <InputAmountSimpleField />
        </HStack>

        {rate !== undefined && (
          <InputAmountRelativeValue
            rate={rate}
            value={value}
            decimals={decimals}
          />
        )}
        {/* Usually the component with the relative value */}
        {footer}
      </VStack>
    </InputAmountSimpleProvider>
  );
}

// Re-export sub-components for convenience
export { InputAmountMax } from '../InputAmountMax';
export { InputAmountRelativeValue } from '../InputAmountRelativeValue';
export { InputAmountToken } from '../InputAmountToken';
