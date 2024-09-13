import { createContext } from 'react';
import type { ReceiptItemProps } from './types';

export const TxScriptsContext = createContext<ReceiptItemProps>(
  {} as ReceiptItemProps,
);
