import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import { Link, toast } from '@fuels/ui';
import type { QueryClient } from '@tanstack/react-query';
import {
  CURRENT_NETWORK_CONTRACTS,
  L1_DISABLE_WITHDRAW,
  STAKING_ENV,
} from 'app-commons';
import { safeWriteContract } from 'app-commons/safeWriteContract';
import type { PublicClient, WalletClient } from 'viem';
import { fuelStreamXAbiMainnet } from '~staking/contracts/stream/fuelStreamXAbiMainnet';
import { fuelStreamXAbiTestnet } from '~staking/contracts/stream/fuelStreamXAbiTestnet';
import { getTransactionLink } from '~staking/systems/Core/utils/getTransactionLink';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';
import type { StakingEventWithProof } from '~staking/systems/Staking/types/l1/events';

export class withdrawFinalizationService {
  /**
   * Prepares finalization by validating the event data and proof
   * @param input Object containing the event data with proof
   * @returns The proof object if validated successfully
   */
  static async prepareFinalize(
    input: withdrawFinalizationServiceInputs['prepareFinalize'],
  ) {
    if (L1_DISABLE_WITHDRAW === 'true') {
      throw new Error('Operation not available');
    }

    const { eventData } = input;

    if (
      !eventData ||
      eventData.status !== GQLWithdrawStatusType.ReadyToProcessWithdraw
    ) {
      throw new Error('Staking event not ready for withdrawal');
    }

    if (!eventData.proof) {
      throw new Error('Proof not available');
    }

    return eventData.proof;
  }

  /**
   * Executes the finalization of a withdrawal on the L1 network
   * @param input Object containing event data, proof, and clients
   * @returns The transaction hash of the finalization transaction
   */
  static async finalizeWithdraw(
    input: withdrawFinalizationServiceInputs['finalizeWithdraw'],
  ) {
    const { eventData, publicClient, walletClient } = input;

    if (!publicClient || !walletClient) {
      throw new Error('Clients not available');
    }

    if (!eventData) {
      throw new Error('Staking event not available');
    }

    if (!eventData.proof) {
      throw new Error('Proof not available');
    }

    try {
      const data = await safeWriteContract({
        client: {
          public: publicClient,
          wallet: walletClient,
        },
        conditions: {
          pauser: [CURRENT_NETWORK_CONTRACTS.FUEL_STREAM_X],
        },
        write: {
          address: CURRENT_NETWORK_CONTRACTS.FUEL_STREAM_X,
          abi:
            STAKING_ENV.toLowerCase() === 'mainnet'
              ? fuelStreamXAbiMainnet
              : fuelStreamXAbiTestnet,
          functionName: 'processSequencerWithdrawalMessage',
          args: [
            BigInt(eventData.proof.bridge_commitment_proof_nonce),
            {
              height: BigInt(
                eventData.proof.proof.bridge_commitment_leaf.height,
              ),
              resultsHash: `0x${eventData.proof.proof.bridge_commitment_leaf.last_results_hash.toLowerCase()}`,
            },
            {
              sideNodes:
                eventData.proof.proof.bridge_commitment_proof.aunts.map(
                  (leave: string) =>
                    `0x${leave.toLowerCase()}` as `0x${string}`,
                ),
              key: BigInt(eventData.proof.proof.bridge_commitment_proof.index),
              numLeaves: BigInt(
                eventData.proof.proof.bridge_commitment_proof.total,
              ),
            },
            `0x${eventData.proof.proof.tx_result_marshalled.toLowerCase()}`,
            {
              sideNodes: eventData.proof.proof.last_results_proof.aunts.map(
                (leave: string) => `0x${leave.toLowerCase()}` as `0x${string}`,
              ),
              key: BigInt(eventData.proof.proof.last_results_proof.index),
              numLeaves: BigInt(eventData.proof.proof.last_results_proof.total),
            },
          ],
        },
      });
      input?.queryClient?.invalidateQueries({
        queryKey: QUERY_KEYS.stakingEvents(
          undefined,
          undefined,
          undefined,
          undefined,
        ),
      });
      return data;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('Unknown error occurred');
    }
  }

  /**
   * Shows a success toast for withdrawal with tx hash link
   */
  static async showSuccessToast(txHash: `0x${string}`) {
    toast({
      title: 'Transaction to finalize withdrawal has been submitted',
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
}

export type withdrawFinalizationServiceInputs = {
  prepareFinalize: {
    eventData: StakingEventWithProof | undefined;
  };
  finalizeWithdraw: {
    eventData: StakingEventWithProof | undefined;
    publicClient: PublicClient | undefined;
    walletClient: WalletClient | undefined;
    queryClient: QueryClient | undefined;
  };
  waitForReceipt: {
    publicClient: PublicClient | undefined;
    txHash: `0x${string}` | undefined;
    queryClient: QueryClient | undefined;
  };
};
