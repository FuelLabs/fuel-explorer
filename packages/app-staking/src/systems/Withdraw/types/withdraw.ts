import type { HexAddress } from 'app-commons';
import type { BN } from 'fuels';
import type { GetSequencerCommitmentInclusionProofResponse } from '~staking/systems/Withdraw/types/proof';

export type PendingCosmosWithdraw = {
  TxHash: string;
  Nonce: string;
  FromAddress: HexAddress;
  Denom: string;
  Amount: string;
  IsProvable: boolean;
};

export type WithdrawData = {
  nonce: string;
  amount?: BN | null;
  decimals?: number;
  formatted?: string;
  txHash: HexAddress;
  proof: GetSequencerCommitmentInclusionProofResponse;
};
