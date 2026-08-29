import { http, createPublicClient } from 'viem';
import type { L1Client, L1Log } from './L1Poller';

export function createL1Client(url: string): L1Client {
  const client = createPublicClient({ transport: http(url) });
  return {
    async getFinalizedBlockNumber(): Promise<bigint> {
      const block = await client.getBlock({ blockTag: 'finalized' });
      if (block.number === null) {
        throw new Error('finalized block has no number');
      }
      return block.number;
    },
    async getLogs(args): Promise<L1Log[]> {
      const logs = await client.getLogs({
        address: args.address as `0x${string}`,
        fromBlock: args.fromBlock,
        toBlock: args.toBlock,
      });
      const result: L1Log[] = [];
      for (const l of logs) {
        // Only mined logs are expected here (getLogs against a finalized
        // window), but viem's general Log type still marks these nullable
        // for pending logs; skip anything that slips through unmined.
        if (
          l.blockNumber === null ||
          l.blockHash === null ||
          l.transactionHash === null ||
          l.logIndex === null
        ) {
          continue;
        }
        result.push({
          address: l.address,
          topics: l.topics as string[],
          data: l.data,
          blockNumber: l.blockNumber,
          blockHash: l.blockHash,
          transactionHash: l.transactionHash,
          logIndex: l.logIndex,
        });
      }
      return result;
    },
    async getBlockTimestamp(blockNumber: bigint): Promise<number> {
      const block = await client.getBlock({ blockNumber });
      return Number(block.timestamp);
    },
  };
}
