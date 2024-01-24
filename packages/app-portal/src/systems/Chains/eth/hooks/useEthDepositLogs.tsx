import { useQuery } from '@tanstack/react-query';
import type { BN } from 'fuels';
import { useMemo } from 'react';
import { decodeEventLog } from 'viem';
import { VITE_ETH_FUEL_MESSAGE_PORTAL } from '~/config';

import { useFuelAccountConnection } from '../../fuel';
import { FUEL_MESSAGE_PORTAL } from '../contracts/FuelMessagePortal';

import { useBlocks } from './useBlocks';
import { useCachedBlocksDates } from './useCachedBlocksDates';
import { useEthAccountConnection } from './useEthAccountConnection';

export const useEthDepositLogs = () => {
  const { publicClient: ethPublicClient, paddedAddress: ethPaddedAddress } =
    useEthAccountConnection();
  const { address: fuelAddress } = useFuelAccountConnection();

  const { isFetching: isFetchingLogs, ...query } = useQuery(
    ['ethDepositLogs', ethPaddedAddress, fuelAddress],
    async () => {
      const abiMessageSent = FUEL_MESSAGE_PORTAL.abi.find(
        ({ name, type }) => name === 'MessageSent' && type === 'event'
      );
      const logs = await ethPublicClient!.getLogs({
        address: VITE_ETH_FUEL_MESSAGE_PORTAL as `0x${string}`,
        event: {
          type: 'event',
          name: 'MessageSent',
          inputs: abiMessageSent?.inputs || [],
        },
        args: {
          recipient: fuelAddress?.toHexString() as `0x${string}`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        fromBlock: 'earliest',
      });
      return logs;
    },
    {
      enabled: !!(ethPublicClient && fuelAddress?.toHexString()),
    }
  );

  const blockHashes = useMemo(() => {
    const hashes = query.data?.map((log) => log.blockHash || '0x');

    return hashes;
  }, [query.data]);

  const { blockDates, notCachedHashes } = useCachedBlocksDates(blockHashes);
  const { blocks, isFetching: isFetchingBlocks } = useBlocks(notCachedHashes);

  const logs = useMemo(() => {
    return query.data?.map((log) => {
      const decodedEvent = decodeEventLog({
        abi: FUEL_MESSAGE_PORTAL.abi,
        data: log.data,
        topics: log.topics,
      });
      let date;
      if (log.blockHash && blockDates) {
        date = blockDates[log.blockHash]
          ? blockDates[log.blockHash]
          : blocks?.find((block) => block.hash === log.blockHash)?.date;
      }
      return {
        ...log,
        event: decodedEvent as unknown as { args: { amount: BN } },
        date,
      };
    });
  }, [query.data, blocks, blockDates]);

  return {
    logs,
    ...query,
    isFetching: isFetchingLogs || isFetchingBlocks,
  };
};
