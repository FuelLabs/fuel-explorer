import { Link, toast } from '@fuels/ui';
import {
  CURRENT_NETWORK_CONTRACTS,
  FuelToken,
  type HexAddress,
  TOKENS,
  getTransactionReceipt,
} from 'app-commons';
import { safeWriteContract } from 'app-commons/safeWriteContract';
import type { BN } from 'fuels';
import { bn } from 'fuels';
import type { WalletClient } from 'viem';
import type { PublicClient } from 'viem';
import { type Address, erc20Abi } from 'viem';
import { sequencerAbi } from '~staking/contracts/sequencer/sequencerAbi';
import { bigIntToBn, bnToBigInt } from '~staking/systems/Core/utils/bn';
import { getTransactionLink } from '~staking/systems/Core/utils/getTransactionLink';
import { getTokenApprovalAmount } from '../../services/erc20';
import { convertSequencerValidatorAddressToEthAddress } from '../../utils/convertSequencerValidatorAddressToEthAddress';
import type { SubmitStakeNewInput } from './types';

const { token: tokenV2 } = TOKENS[FuelToken.V2];
export class StakeNewService {
  /**
   * Validates the stakeal inputs
   */
  static validateStakeNew(input: SubmitStakeNewInput) {
    if (!input.amount) {
      throw new Error('No amount specified');
    }

    if (input.amount.isZero()) {
      throw new Error('Amount must be greater than zero');
    }

    if (!input.publicClient || !input.walletClient) {
      throw new Error('Wallet not connected');
    }

    if (!input.validator) {
      throw new Error('No validator specified');
    }

    if (!input.amountFromL1?.gt(0) && !input.amountFromSequencer?.gt(0)) {
      throw new Error('Amount from L1 or Sequencer must be greater than 0');
    }

    return {
      validator: input.validator,
      amount: input.amount,
      publicClient: input.publicClient,
      walletClient: input.walletClient,
      amountFromL1: input.amountFromL1,
      amountFromSequencer: input.amountFromSequencer,
    };
  }

  /**
   * Submits a stake transaction to the contract
   */
  static async submitStake(input: SubmitStakeNewInput) {
    // Validate the inputs
    const validatedInput = StakeNewService.validateStakeNew(input);
    const {
      publicClient,
      walletClient,
      validator,
      amountFromL1,
      amountFromSequencer,
    } = validatedInput;

    const txHashs: { l1?: HexAddress; sequencer?: HexAddress } = {
      l1: undefined,
      sequencer: undefined,
    };

    if (amountFromL1?.gt(0)) {
      const amountBigInt = bnToBigInt(amountFromL1 as BN);
      txHashs.l1 = await safeWriteContract({
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
          functionName: 'depositAndDelegate',
          args: [
            amountBigInt,
            convertSequencerValidatorAddressToEthAddress(validator),
          ],
        },
      });
    }

    if (amountFromSequencer?.gt(0)) {
      const amountBigInt = bnToBigInt(amountFromSequencer as BN);
      txHashs.sequencer = await safeWriteContract({
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
          functionName: 'delegate',
          args: [
            amountBigInt,
            convertSequencerValidatorAddressToEthAddress(validator),
          ],
        },
      });
    }

    return txHashs;
  }

  /**
   * Shows a success toast for stake with tx hash link
   */
  static showSuccessToast(txHashs: {
    l1?: HexAddress;
    sequencer?: HexAddress;
  }): void {
    const { l1, sequencer } = txHashs;

    if (l1) {
      toast({
        title: 'Stake request has been submitted',
        description: (
          <Link
            href={getTransactionLink(l1, 'l1')}
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

    if (sequencer) {
      toast({
        title: 'Stake request has been submitted',
        description: (
          <Link
            href={getTransactionLink(sequencer, 'l1')}
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
  }

  /**
   * Estimates the gas fee for a stake transaction
   */
  static async estimateStakeFee(input: SubmitStakeNewInput): Promise<bigint> {
    // Validate the inputs
    const validatedInput = StakeNewService.validateStakeNew(input);
    const { publicClient, walletClient, amount, validator } = validatedInput;

    const amountBigInt = bnToBigInt(amount as BN);

    // Estimate gas for the transaction
    const gasEstimate = await publicClient.estimateContractGas({
      address: CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE,
      abi: sequencerAbi,
      functionName: 'delegate',
      // functionName: 'depositAndDelegate',
      args: [
        amountBigInt,
        convertSequencerValidatorAddressToEthAddress(validator),
      ],
      account: walletClient.account?.address,
    });

    // Get current gas price
    const gasPrice = await publicClient.getGasPrice();

    // Calculate fee
    return gasEstimate * gasPrice;
  }

  /**
   * Gets the token approval amount for a specific token
   */
  static async getEthTokenAllowance({
    publicClient,
    ownerAddress,
  }: {
    publicClient?: PublicClient;
    ownerAddress?: Address;
  }) {
    if (!publicClient || !ownerAddress) {
      return bn(0);
    }

    // Call the lower-level service function
    const approvalAmount = await getTokenApprovalAmount({
      publicClient,
      tokenAddress: tokenV2,
      spenderAddress: CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE,
      ownerAddress,
    });

    return bn(approvalAmount.toString());
  }

  static async approveEthToken({
    walletClient,
    publicClient,
    ethAccount,
    amount,
  }: {
    walletClient?: WalletClient | null;
    publicClient?: PublicClient | null;
    ethAccount?: HexAddress;
    amount?: BN | null;
  }) {
    if (!walletClient || !publicClient || !ethAccount || !amount) {
      throw new Error('Missing required data for token approval');
    }

    // Get the staking contract address from your config or environment
    const stakingContractAddress =
      CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE;

    // Convert BN to bigint for the viem contract call
    const amountBigInt = bnToBigInt(amount);

    try {
      const hash = await safeWriteContract({
        client: {
          public: publicClient,
          wallet: walletClient,
        },
        conditions: {
          pauser: [stakingContractAddress],
        },
        write: {
          address: tokenV2,
          abi: erc20Abi,
          functionName: 'approve',
          args: [stakingContractAddress, amountBigInt],
        },
      });

      return hash;
    } catch (error) {
      console.error('Error approving token:', error);
      throw error;
    }
  }

  static async waitingReceiptsApproveEthToken({
    publicClient,
    ethAccount,
    hash,
  }: {
    publicClient?: PublicClient | null;
    ethAccount?: HexAddress;
    hash: Address;
  }) {
    if (!publicClient || !ethAccount) {
      throw new Error('Missing required client data');
    }

    // Get the staking contract address from your config or environment
    const stakingContractAddress =
      CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE;

    try {
      // Wait for the transaction receipt
      const receipt = await getTransactionReceipt({
        publicClient,
        txHash: hash,
      });

      if (receipt.status !== 'success') {
        throw new Error('Token approval transaction failed');
      }

      // Fetch the updated allowance
      const allowance = await publicClient.readContract({
        address: tokenV2,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [ethAccount, stakingContractAddress],
      });

      // Convert the bigint to BN
      return bigIntToBn(allowance);
    } catch (error) {
      console.error('Error waiting for token approval receipt:', error);
      throw error;
    }
  }
}
