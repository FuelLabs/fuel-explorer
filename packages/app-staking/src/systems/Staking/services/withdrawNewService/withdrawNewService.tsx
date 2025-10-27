import { Link, toast } from '@fuels/ui';
import {
  CURRENT_NETWORK_CONTRACTS,
  L1_DISABLE_WITHDRAW,
  safeWriteContract,
} from 'app-commons';
import type { BN } from 'fuels';
import type { WalletClient } from 'viem';
import type { PublicClient } from 'viem';
import { sequencerAbi } from '~staking/contracts/sequencer/sequencerAbi';
import { bnToBigInt } from '~staking/systems/Core/utils/bn';
import { getTransactionLink } from '~staking/systems/Core/utils/getTransactionLink';
import type { SubmitWithdrawNewInput } from './types';

export class WithdrawNewService {
  /**
   * Validates the withdrawal inputs
   */
  static validateWithdrawNew(input: SubmitWithdrawNewInput): string | null {
    if (!input.amount) {
      return 'No amount specified';
    }

    if (input.amount.isZero()) {
      return 'Amount must be greater than zero';
    }

    if (!input.publicClient || !input.walletClient) {
      return 'Wallet not connected';
    }

    if (L1_DISABLE_WITHDRAW === 'true') {
      return 'Operation not available';
    }

    return null;
  }

  /**
   * Submits a withdraw transaction to the contract
   */
  static async submitWithdraw(
    input: SubmitWithdrawNewInput,
  ): Promise<`0x${string}`> {
    // Validate the inputs
    const validationError = WithdrawNewService.validateWithdrawNew(input);
    if (validationError) {
      throw new Error(validationError);
    }

    const { publicClient, walletClient, amount } = input;

    // here we can use "as" because the validation was done before
    const amountBigInt = bnToBigInt(amount as BN);
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
        functionName: 'withdraw',
        args: [amountBigInt],
      },
    } as any); // Fix type instantiation depth issue

    return hash;
  }

  /**
   * Shows a success toast for withdrawal with tx hash link
   */
  static showSuccessToast(txHash: `0x${string}`): void {
    toast({
      title: 'Withdrawal request has been submitted',
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
  static async estimateWithdrawFee(
    input: SubmitWithdrawNewInput,
  ): Promise<bigint> {
    // Validate the inputs
    const { publicClient, walletClient, amount } = input;

    const validationError = WithdrawNewService.validateWithdrawNew(input);
    if (validationError || !publicClient || !walletClient) {
      throw new Error(validationError ?? 'Invalid inputs');
    }

    const amountBigInt = bnToBigInt(amount as BN);

    // Estimate gas for the transaction
    const gasEstimate = await publicClient.estimateContractGas({
      address: CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE,
      abi: sequencerAbi,
      functionName: 'withdraw',
      args: [amountBigInt],
      account: walletClient.account?.address,
    });

    // Get current gas price
    const gasPrice = await publicClient.getGasPrice();

    // Calculate fee
    return gasEstimate * gasPrice;
  }
}
