import type { BN } from '@fuel-ts/math';

export type AmountChangeParameters =
  | { text: string; incomingAmount?: never }
  | { text?: never; incomingAmount: BN | null | undefined };
