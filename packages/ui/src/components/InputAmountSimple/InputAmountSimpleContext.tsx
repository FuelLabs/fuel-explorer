import type { BN } from 'fuels';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';

interface InputAmountSimpleContextData {
  decimals?: number;
  image?: string;
  symbol?: string;
  value?: BN;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: BN) => void;
}

export const InputAmountSimpleContext = createContext<
  InputAmountSimpleContextData | undefined
>(undefined);

export function InputAmountSimpleProvider({
  decimals,
  image,
  symbol,
  value,
  disabled,
  readOnly,
  onChange,
  children,
}: PropsWithChildren<InputAmountSimpleContextData>) {
  const ctx = useMemo<InputAmountSimpleContextData>(() => {
    return {
      decimals,
      image,
      symbol,
      value,
      disabled,
      onChange,
      readOnly,
    };
  }, [decimals, image, symbol, value, disabled, readOnly, onChange]);

  return (
    <InputAmountSimpleContext.Provider value={ctx}>
      {children}
    </InputAmountSimpleContext.Provider>
  );
}

export function useAmountSimpleCtx() {
  const ctx = useContext(InputAmountSimpleContext);

  if (!ctx) {
    throw new Error('InputAmountSimpleContext not found');
  }

  return ctx;
}
