import { getBridgeSolidityContracts } from 'app-commons';
import type { PublicClient } from 'viem';
import { formatSecondsToETA } from '~staking/systems/Core/utils/formatSecondsToETA';

// Additional time before L1 finalization kicks in (matches indexer constants)
const TIME_TO_COMMIT_TO_L1 = 10 * 60 * 60; // 10 hours
const TIME_TO_SEQUENCER_SYNC = 30 * 60; // 30 minutes

const FUEL_CHAIN_STATE_ABI = [
  {
    inputs: [],
    name: 'TIME_TO_FINALIZE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const FinalizationPeriodService = {
  fetchFinalizationPeriod: async (publicClient?: PublicClient) => {
    if (!publicClient) return undefined;

    try {
      const contracts = await getBridgeSolidityContracts();
      const fuelChainStateAddress = contracts?.FuelChainState as
        | `0x${string}`
        | undefined;

      if (!fuelChainStateAddress) {
        console.log('[ETA] No FuelChainState address found');
        return undefined;
      }

      console.log(
        '[ETA] Reading TIME_TO_FINALIZE from contract:',
        fuelChainStateAddress,
      );

      const timeToFinalize = (await publicClient.readContract({
        address: fuelChainStateAddress,
        abi: FUEL_CHAIN_STATE_ABI,
        functionName: 'TIME_TO_FINALIZE',
      })) as bigint;

      console.log(
        '[ETA] TIME_TO_FINALIZE raw value:',
        timeToFinalize,
        `(${Number(timeToFinalize)} seconds)`,
      );

      if (timeToFinalize == null) return undefined;

      const totalSeconds =
        Number(timeToFinalize) + TIME_TO_COMMIT_TO_L1 + TIME_TO_SEQUENCER_SYNC;
      console.log(
        '[ETA] Total ETA:',
        totalSeconds,
        `(finalize=${Number(timeToFinalize)}s + commit=${TIME_TO_COMMIT_TO_L1}s + sync=${TIME_TO_SEQUENCER_SYNC}s)`,
      );
      const formatted = formatSecondsToETA(totalSeconds, '~');
      return formatted;
    } catch (error) {
      console.error('Error fetching finalization period:', error);
      return undefined;
    }
  },
};
