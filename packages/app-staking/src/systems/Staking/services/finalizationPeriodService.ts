import { getBridgeSolidityContracts } from 'app-commons';
import type { PublicClient } from 'viem';
import { formatSecondsToETA } from '~staking/systems/Core/utils/formatSecondsToETA';
import { DEFAULT_SECURITY_PERIOD_ETA } from '../constants/eta';

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
    if (!publicClient) return DEFAULT_SECURITY_PERIOD_ETA;

    try {
      const contracts = await getBridgeSolidityContracts();
      const fuelChainStateAddress = contracts?.FuelChainState as
        | `0x${string}`
        | undefined;

      if (!fuelChainStateAddress) return DEFAULT_SECURITY_PERIOD_ETA;

      const timeToFinalize = (await publicClient.readContract({
        address: fuelChainStateAddress,
        abi: FUEL_CHAIN_STATE_ABI,
        functionName: 'TIME_TO_FINALIZE',
      })) as bigint;

      if (!timeToFinalize) return DEFAULT_SECURITY_PERIOD_ETA;

      return formatSecondsToETA(Number(timeToFinalize), '~');
    } catch (error) {
      console.error('Error fetching finalization period:', error);
      return DEFAULT_SECURITY_PERIOD_ETA;
    }
  },
};
