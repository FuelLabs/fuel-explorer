import type { PublicClient } from 'viem';
import type { L1Client, L1Log } from './L1Poller';

// Takes an already-constructed viem client rather than a URL, so callers
// (main.ts) build exactly one long-lived client at boot and share it across
// every consumer that talks to L1 -- this poller and FinalizationPeriods --
// instead of each constructing (and each reconnecting) its own.
export function createL1Client(client: PublicClient): L1Client {
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
