import type { LayerIntent } from '@fuel-ui/css';

export type TxStatus = 'idle' | 'pending' | 'success' | 'error';
export type TxType = 'contract-call' | 'mint' | 'transfer' | 'burn';

export const TX_ICON_MAP: Record<TxType, string> = {
  'contract-call': 'Code',
  mint: 'Coins',
  transfer: 'Transfer',
  burn: 'Flame',
};

export const TX_INTENT_MAP: Record<TxStatus, LayerIntent> = {
  success: 'success',
  error: 'error',
  pending: 'warning',
  idle: 'base',
};

export const TX_STATUS_MAP: Record<TxStatus, string> = {
  success: 'Success',
  error: 'Error',
  pending: 'Pending',
  idle: 'Idle',
};
