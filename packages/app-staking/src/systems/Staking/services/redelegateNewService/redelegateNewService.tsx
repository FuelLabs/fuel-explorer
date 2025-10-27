import { Link, toast } from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS } from 'app-commons';
import { safeWriteContract } from 'app-commons/safeWriteContract';
import type { BN } from 'fuels';
import type { WalletClient } from 'viem';
import type { PublicClient } from 'viem';
import { sequencerAbi } from '~staking/contracts/sequencer/sequencerAbi';
import { bnToBigInt } from '~staking/systems/Core/utils/bn';
import { getTransactionLink } from '~staking/systems/Core/utils/getTransactionLink';
import { convertSequencerValidatorAddressToEthAddress } from '../../utils/convertSequencerValidatorAddressToEthAddress';
import type { SubmitRedelegateNewInput } from './types';

export class RedelegateNewService {
  /**
   * Validates the redelegateal inputs
   */
  static validateRedelegateNew(input: SubmitRedelegateNewInput) {
    if (!input.amount) {
      throw new Error('No amount specified');
    }

    if (input.amount.isZero()) {
      throw new Error('Amount must be greater than zero');
    }

    if (!input.publicClient || !input.walletClient) {
      throw new Error('Wallet not connected');
    }

    if (!input.fromValidator || !input.toValidator) {
      throw new Error('No validator specified');
    }

    return {
      fromValidator: input.fromValidator,
      toValidator: input.toValidator,
      amount: input.amount,
      publicClient: input.publicClient,
      walletClient: input.walletClient,
    };
  }

  /**
   * Submits a redelegate transaction to the contract
   */
  static async submitRedelegate(
    input: SubmitRedelegateNewInput,
  ): Promise<`0x${string}`> {
    // Validate the inputs
    const validatedInput = RedelegateNewService.validateRedelegateNew(input);
    const { publicClient, walletClient, amount, fromValidator, toValidator } =
      validatedInput;

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
        functionName: 'redelegate',
        args: [
          amountBigInt,
          convertSequencerValidatorAddressToEthAddress(fromValidator),
          convertSequencerValidatorAddressToEthAddress(toValidator),
        ],
      },
    });

    return hash;
  }

  /**
   * Shows a success toast for redelegate with tx hash link
   */
  static showSuccessToast(txHash: `0x${string}`): void {
    toast({
      title: 'Redelegate request has been submitted',
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
   * Estimates the gas fee for a redelegate transaction
   */
  static async estimateRedelegateFee(
    input: SubmitRedelegateNewInput,
  ): Promise<bigint> {
    // Validate the inputs
    const validatedInput = RedelegateNewService.validateRedelegateNew(input);
    const { publicClient, walletClient, amount, fromValidator, toValidator } =
      validatedInput;

    const amountBigInt = bnToBigInt(amount as BN);

    // Estimate gas for the transaction
    const gasEstimate = await publicClient.estimateContractGas({
      address: CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE,
      abi: sequencerAbi,
      functionName: 'redelegate',
      args: [
        amountBigInt,
        convertSequencerValidatorAddressToEthAddress(fromValidator),
        convertSequencerValidatorAddressToEthAddress(toValidator),
      ],
      account: walletClient.account?.address,
    });

    // Get current gas price
    const gasPrice = await publicClient.getGasPrice();

    // Calculate fee
    return gasEstimate * gasPrice;
  }
}
