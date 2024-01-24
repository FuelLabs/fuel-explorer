import { useQuery } from '@tanstack/react-query';
import { bn } from 'fuels';
import { useMemo } from 'react';

import { EthTxCache } from '../utils';

import { useEthAccountConnection } from './useEthAccountConnection';

export const useBlocks = (blockHashes?: `0x${string}`[]) => {
  const { publicClient } = useEthAccountConnection();
  const query = useQuery(
    ['block', blockHashes],
    async () => {
      if (!blockHashes?.length) return null;
      const blockPromises = blockHashes?.map((blockHash) => {
        if (blockHash) {
          const blockPromise = publicClient.getBlock({ blockHash });
          return blockPromise;
        }
        return null;
      });
      const blocks = await Promise.all(blockPromises);
      return blocks;
    },
    {
      enabled: !!blockHashes?.length,
    }
  );

  const blockData = useMemo(() => {
    return query.data?.map((block) => {
      EthTxCache.setBlockDate(
        block?.hash || '',
        bn(block?.timestamp.toString()).mul(1000).toString()
      );
      const date = block?.timestamp
        ? new Date(bn(block.timestamp.toString()).mul(1000).toNumber())
        : undefined;
      return {
        ...block,
        date,
      };
    });
  }, [query.data]);

  return {
    blocks: blockData,
    ...query,
  };
};
