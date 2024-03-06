import { bn } from 'fuels';
import type { PublicClient } from 'wagmi';

export const getBlockDate = async ({
  blockHash,
  publicClient,
}: {
  blockHash: `0x${string}`;
  publicClient: PublicClient;
}) => {
  const block = await publicClient.getBlock({ blockHash });
  const parsedDate = bn(block.timestamp.toString()).mul(1000);
  return new Date(parsedDate.toNumber());
};
