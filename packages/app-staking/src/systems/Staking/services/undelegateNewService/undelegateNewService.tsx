import { Link, toast } from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS, type HexAddress } from 'app-commons';
import { safeWriteContract } from 'app-commons/safeWriteContract';
import { sequencerAbi } from '~staking/contracts/sequencer/sequencerAbi';
import { bnToBigInt } from '~staking/systems/Core/utils/bn';
import { getTransactionLink } from '~staking/systems/Core/utils/getTransactionLink';
import { convertSequencerValidatorAddressToEthAddress } from '../../utils/convertSequencerValidatorAddressToEthAddress';
import type { SubmitUndelegateNewDialogInput } from './types';

export class UndelegateNewService {
  /**
   * Validates the undelegate inputs
   */
  static validateUndelegateNewDialog(input: SubmitUndelegateNewDialogInput) {
    if (!input.validator) {
      throw new Error('No validator specified');
    }

    if (!input.publicClient || !input.walletClient) {
      throw new Error('Wallet not connected');
    }

    if (!input.amount) {
      throw new Error('No amount specified');
    }

    if (input.amount.isZero()) {
      throw new Error('Amount must be greater than zero');
    }

    return {
      validator: input.validator,
      publicClient: input.publicClient,
      walletClient: input.walletClient,
      amount: input.amount,
    };
  }

  /**
   * Submits a undelegate transaction to the contract
   */
  static async submitUndelegate(
    input: SubmitUndelegateNewDialogInput,
  ): Promise<HexAddress> {
    // Validate the inputs
    const { publicClient, walletClient, validator, amount } =
      UndelegateNewService.validateUndelegateNewDialog(input);

    const tx = await safeWriteContract({
      client: {
        public: publicClient,
        wallet: walletClient,
      },
      write: {
        address: CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE,
        abi: sequencerAbi,
        functionName: 'unbond',
        args: [
          bnToBigInt(amount),
          convertSequencerValidatorAddressToEthAddress(validator),
        ],
      },
    });

    return tx;
  }

  /**
   * Shows a success toast for undelegate with tx hash link
   */
  static showSuccessToast(txHash: `0x${string}`): void {
    toast({
      title: 'Undelegate transaction has been submitted',
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
   * Estimates the gas fee for a undelegate transaction
   */
  static async estimateUndelegateFee(
    input: SubmitUndelegateNewDialogInput,
  ): Promise<bigint> {
    // Validate the inputs
    const { publicClient, walletClient, validator, amount } =
      UndelegateNewService.validateUndelegateNewDialog(input);

    // Estimate gas for the transaction
    const gasEstimate = await publicClient.estimateContractGas({
      address: CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE,
      abi: sequencerAbi,
      functionName: 'unbond',
      args: [
        bnToBigInt(amount),
        convertSequencerValidatorAddressToEthAddress(validator),
      ],
      account: walletClient.account?.address,
    });

    // Get current gas price
    const gasPrice = await publicClient.getGasPrice();

    // Calculate fee
    return gasEstimate * gasPrice;
  }
}
