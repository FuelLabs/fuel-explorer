import { useNamedQuery } from '@fuels/react';
import { getBridgeSolidityContracts } from 'app-commons';
import dayjs from 'dayjs';
import type { PublicClient } from 'viem';
import { usePublicClient } from 'wagmi';
import { EthConnectorService, distanceToNow } from '~portal/systems/Chains';

export function useWithdrawDelay() {
  const publicClient = usePublicClient() as PublicClient;

  const { fuelChainState } = useNamedQuery('fuelChainState', {
    queryKey: ['fuel', 'bridge', 'withdraw', 'state'],
    queryFn: getBridgeSolidityContracts,
    select: (bridgeSolidityContracts) => {
      return EthConnectorService.connectToFuelChainState({
        publicClient,
        bridgeSolidityContracts,
      });
    },
    staleTime: Infinity,
    enabled: !!publicClient,
  });

  return useNamedQuery('timeToWithdrawFormatted', {
    queryKey: ['fuel', 'bridge', 'withdraw', 'formatted'],
    queryFn: async () => {
      const [blocksPerCommitInterval, timeToFinalize] = (await Promise.all([
        fuelChainState?.read.BLOCKS_PER_COMMIT_INTERVAL(),
        fuelChainState?.read.TIME_TO_FINALIZE(),
      ])) as [bigint, bigint];
      // It's safe to convert bigint to number in this case as the values of
      // blockPerCommitInterval and timeToFinalize are not too big.
      const totalTimeInSeconds =
        Number(blocksPerCommitInterval) + Number(timeToFinalize);
      const futureDate = dayjs().add(totalTimeInSeconds, 'seconds');

      return distanceToNow(futureDate.toDate());
    },
    staleTime: Infinity,
    enabled: !!fuelChainState,
  });
}
