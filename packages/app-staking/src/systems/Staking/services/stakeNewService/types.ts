import type { BN } from 'fuels';
import type { PublicClient, WalletClient } from 'viem';
import type {
  SequencerValidatorAddress,
  StakingAddress,
} from '~staking/systems/Core';

export interface MachineContext {
  publicClient: PublicClient | null;
  walletClient: WalletClient | null;
  amount: BN | null;
  account: StakingAddress | undefined;
  ethAccount: string | undefined;
  balance: BN;
  symbol?: string;
  decimals?: number;
}

export interface SubmitStakeNewInput {
  publicClient?: PublicClient | null;
  walletClient?: WalletClient | null;
  amount?: BN | null;
  validator?: SequencerValidatorAddress;
  amountFromL1?: BN;
  amountFromSequencer?: BN;
}
