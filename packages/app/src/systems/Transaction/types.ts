export enum TxTypeEnum {
  'contract-call' = 'contract-call',
  mint = 'mint',
  transfer = 'transfer',
  burn = 'burn',
}
export enum TxStatusEnum {
  idle = 'idle',
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export type TxStatus = keyof typeof TxStatusEnum;
export type TxType = keyof typeof TxTypeEnum;

export const TX_TYPES = Object.values(TxTypeEnum);
export const TX_STATUS = Object.values(TxStatusEnum);
