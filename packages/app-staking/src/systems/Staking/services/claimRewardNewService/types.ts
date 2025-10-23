import type { BN } from 'fuels';
import type { PublicClient, WalletClient } from 'viem';
import type {
  SequencerValidatorAddress,
  StakingAddress,
} from '~staking/systems/Core';

export interface SharedSequencerBalances {
  balances: Array<SharedSequencerBalance>;
}

export interface SharedSequencerBalance {
  denom: string;
  amount: string;
}

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

export interface SubmitClaimRewardNewDialogInput {
  publicClient?: PublicClient | null;
  walletClient?: WalletClient | null;
  validator: SequencerValidatorAddress;
}
