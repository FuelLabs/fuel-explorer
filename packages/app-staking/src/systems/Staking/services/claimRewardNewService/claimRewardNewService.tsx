import { Link, toast } from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS } from 'app-commons';
import { safeWriteContract } from 'app-commons/safeWriteContract';
import type { WalletClient } from 'viem';
import type { PublicClient } from 'viem';
import { sequencerAbi } from '~staking/contracts/sequencer/sequencerAbi';
import { getTransactionLink } from '~staking/systems/Core/utils/getTransactionLink';
import { convertSequencerValidatorAddressToEthAddress } from '../../utils/convertSequencerValidatorAddressToEthAddress';
import type { SubmitClaimRewardNewDialogInput } from './types';

export class ClaimRewardNewService {
  /**
   * Validates the withdrawal inputs
   */
  static validateClaimRewardNewDialog(input: SubmitClaimRewardNewDialogInput) {
    if (!input.validator) {
      throw new Error('No validator specified');
    }

    if (!input.publicClient || !input.walletClient) {
      throw new Error('Wallet not connected');
    }

    return {
      validator: input.validator,
      publicClient: input.publicClient,
      walletClient: input.walletClient,
    };
  }

  /**
   * Submits a withdraw transaction to the contract
   */
  static async submitClaimReward(
    input: SubmitClaimRewardNewDialogInput,
  ): Promise<`0x${string}`> {
    // Validate the inputs
    const { publicClient, walletClient, validator } =
      ClaimRewardNewService.validateClaimRewardNewDialog(input);

    // here we can use "as" because the validation was done before
    const hash = await safeWriteContract({
      client: {
        // here we can use "as" because the validation was done before
        public: publicClient as PublicClient,
        wallet: walletClient as WalletClient,
      },
      conditions: {
        pauser: [CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE],
      },
      write: {
        address: CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE,
        abi: sequencerAbi,
        functionName: 'claimRewards',
        args: [convertSequencerValidatorAddressToEthAddress(validator)],
      },
    });

    return hash;
  }

  /**
   * Shows a success toast for withdrawal with tx hash link
   */
  static showSuccessToast(txHash: `0x${string}`): void {
    toast({
      title: 'Claim Reward transaction has been submitted',
      description: (
        <Link
          href={getTransactionLink(txHash, 'l1')}
          target="_blank"
          rel="noopener noreferrer"
          color="green"
        >
          View on Etherscan
        </Link>
      ),
      variant: 'info',
      duration: 5_000,
    });
  }

  /**
   * Estimates the gas fee for a withdraw transaction
   */
  static async estimateClaimRewardFee(
    input: SubmitClaimRewardNewDialogInput,
  ): Promise<bigint> {
    // Validate the inputs
    const { publicClient, walletClient, validator } =
      ClaimRewardNewService.validateClaimRewardNewDialog(input);

    // Estimate gas for the transaction
    const gasEstimate = await publicClient.estimateContractGas({
      address: CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE,
      abi: sequencerAbi,
      functionName: 'claimRewards',
      args: [convertSequencerValidatorAddressToEthAddress(validator)],
      account: walletClient.account?.address,
    });

    // Get current gas price
    const gasPrice = await publicClient.getGasPrice();

    // Calculate fee
    return gasEstimate * gasPrice;
  }
}
