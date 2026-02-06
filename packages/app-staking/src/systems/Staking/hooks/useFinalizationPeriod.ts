import { useQuery } from '@tanstack/react-query';
import { getBridgeSolidityContracts } from 'app-commons';
import { useReadContract } from 'wagmi';
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

export const useFinalizationPeriod = () => {
  const { data: contracts } = useQuery({
    queryKey: ['bridgeSolidityContracts'],
    queryFn: getBridgeSolidityContracts,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const fuelChainStateAddress = contracts?.FuelChainState as
    | `0x${string}`
    | undefined;

  const { data: timeToFinalize, isLoading } = useReadContract({
    address: fuelChainStateAddress,
    abi: FUEL_CHAIN_STATE_ABI,
    functionName: 'TIME_TO_FINALIZE',
    query: {
      enabled: !!fuelChainStateAddress,
    },
  });

  if (isLoading || !timeToFinalize) {
    return DEFAULT_SECURITY_PERIOD_ETA;
  }

  return formatSecondsToETA(Number(timeToFinalize), '~');
};
