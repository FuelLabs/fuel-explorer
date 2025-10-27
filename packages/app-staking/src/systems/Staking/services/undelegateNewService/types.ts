import type { BN } from 'fuels';
import type { PublicClient, WalletClient } from 'viem';
import type { SequencerValidatorAddress } from '~staking/systems/Core';

export interface SubmitUndelegateNewDialogInput {
  publicClient?: PublicClient | null;
  walletClient?: WalletClient | null;
  validator?: SequencerValidatorAddress | null;
  amount?: BN | null;
}
