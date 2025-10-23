import { bn } from 'fuels';

import type { HexAddress } from 'app-commons';
import type { PublicClient } from 'viem';
import { EthTxCache } from './txCache';

export const getBlockDate = async ({
  blockHash,
  publicClient,
}: {
  blockHash: HexAddress;
  publicClient: PublicClient;
}) => {
  const cachedBlockDate = EthTxCache.getBlockDate(blockHash);

  if (!cachedBlockDate) {
    const block = await publicClient.getBlock({ blockHash });
    const parsedDate = bn(block.timestamp.toString()).mul(1000);
    EthTxCache.setBlockDate(blockHash, parsedDate.toString());
    return new Date(parsedDate.toNumber());
  }

  return new Date(Number(cachedBlockDate));
};
