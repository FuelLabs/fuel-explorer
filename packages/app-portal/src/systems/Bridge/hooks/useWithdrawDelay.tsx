import { useQuery } from '@tanstack/react-query';
import {
  BridgeSolidityContracts,
  getBridgeSolidityContracts,
} from 'app-commons';
import { addSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { EthConnectorService, distanceToNow } from '~portal/systems/Chains';

export function useWithdrawDelay() {
  const [bridgeSolidityContracts, setBridgeSolidityContracts] =
    useState<BridgeSolidityContracts>();
  const publicClient = usePublicClient();

  useEffect(() => {
    if (!publicClient) return;

    async function getContract() {
      const contracts = await getBridgeSolidityContracts();
      setBridgeSolidityContracts(contracts);
    }

    getContract();
  }, [publicClient]);

  const fuelChainState = useMemo(() => {
    if (!bridgeSolidityContracts) return;

    return EthConnectorService.connectToFuelChainState({
      publicClient: publicClient as any,
      bridgeSolidityContracts,
    });
  }, [publicClient, bridgeSolidityContracts]);

  const { data, ...params } = useQuery({
    queryKey: ['withdrawDelay'],
    queryFn: async () => {
      const [blocksPerCommitInterval, timeToFinalize] = (await Promise.all([
        fuelChainState?.read.BLOCKS_PER_COMMIT_INTERVAL(),
        fuelChainState?.read.TIME_TO_FINALIZE(),
      ])) as [bigint, bigint];
      // It's safe to convert bigint to number in this case as the values of
      // blockPerCommitInterval and timeToFinalize are not too big.
      const totalTimeInSeconds =
        Number(blocksPerCommitInterval) + Number(timeToFinalize);
      const currentDate = new Date();
      const futureDate = addSeconds(currentDate, totalTimeInSeconds);

      return {
        timeToWithdrawFormatted: distanceToNow(futureDate),
        timeToWithdrawSeconds: totalTimeInSeconds,
      };
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!fuelChainState,
  });

  return {
    ...data,
    ...params,
  };
}
