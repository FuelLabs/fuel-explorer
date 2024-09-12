import type { BN, FormatConfig } from '@fuel-ts/math';
import { createContext } from 'react';
import type { AmountChangeParameters } from './InputAmount.types';

type InputAmountRootContext = {
  balance: BN;
  formatOpts: FormatConfig;
};

type InputAmountFieldContext = {
  disabled?: boolean;
  assetAmount: string;
  handleAmountChange: (props: AmountChangeParameters) => void;
};

export const InputAmountRootCtx = createContext<InputAmountRootContext>(
  {} as InputAmountRootContext,
);

export const InputAmountFieldCtx = createContext<InputAmountFieldContext>(
  {} as InputAmountFieldContext,
);
