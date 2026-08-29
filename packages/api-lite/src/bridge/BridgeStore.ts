import type { L1Index } from '../l1/L1Index';

export type BridgeStoreDeps = {
  l1Index: Pick<L1Index, 'queryLogs'>;
};

export type DepositLogItem = {
  recipient: string;
  blockHash: string | null;
  topics: string;
  data: string | null;
  nonce: string | null;
  transactionHash: string;
};

export type BlockHashItem = {
  fuelBlockHash: string | null;
  ethBlockHash: string | null;
};

export type MessageRelayedItem = {
  transactionHash: string;
};

type L1LogRow = ReturnType<L1Index['queryLogs']>[number];

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// queryLogs() returns rows ordered block_height DESC, log_index DESC; sorting
// by timestamp alone leaves same-timestamp ties unordered, so block_height
// and log_index break ties here too.
function compareAsc(a: L1LogRow, b: L1LogRow): number {
  const byTimestamp = a.timestamp.localeCompare(b.timestamp);
  if (byTimestamp !== 0) return byTimestamp;
  if (a.block_height !== b.block_height) return a.block_height - b.block_height;
  return a.log_index - b.log_index;
}

export class BridgeStore {
  constructor(private readonly deps: BridgeStoreDeps) {}

  // recipient/predicate are `bytes32`, not `address`: viem's decodeEventLog
  // never EIP-55-checksums them, so a caller-side .toLowerCase() is enough
  // for a case-insensitive match.
  queryLogsForRecipient(
    address: string,
    recipient: string,
    predicate: string,
  ): DepositLogItem[] {
    const recipientLower = recipient.toLowerCase();
    const predicateLower = predicate.toLowerCase();
    const recipientHex = recipientLower.replace(/^0x/, '');

    const directRows = this.deps.l1Index.queryLogs({
      contractHash: address,
      event: 'MessageSent',
      argKey: 'recipient',
      argValue: recipientLower,
    });

    const predicateRows = this.deps.l1Index
      .queryLogs({
        contractHash: address,
        event: 'MessageSent',
        argKey: 'recipient',
        argValue: predicateLower,
      })
      .filter((row) => {
        const decodedArgs = parseJson<{ data?: string }>(row.decoded_args, {});
        const data =
          typeof decodedArgs.data === 'string'
            ? decodedArgs.data.toLowerCase()
            : '';
        return data.includes(recipientHex);
      });

    const seen = new Set<number>();
    const merged: L1LogRow[] = [];
    for (const row of [...directRows, ...predicateRows]) {
      if (seen.has(row._id)) continue;
      seen.add(row._id);
      merged.push(row);
    }
    merged.sort((a, b) => compareAsc(b, a));

    return merged.map((row) => {
      const decodedArgs = parseJson<{ recipient?: string; nonce?: string }>(
        row.decoded_args,
        {},
      );
      const rawLog = parseJson<{
        blockHash?: string;
        topics?: string[];
        data?: string;
      }>(row.raw_log, {});
      return {
        recipient: decodedArgs.recipient ?? '',
        blockHash: rawLog.blockHash ?? null,
        topics: JSON.stringify(rawLog.topics ?? []),
        data: rawLog.data ?? null,
        nonce: decodedArgs.nonce ?? null,
        transactionHash: row.tx_hash,
      };
    });
  }

  // queryLogs only expresses fromBlock as `>=`, so an exclusive lower bound
  // becomes `fromBlock + 1` (block heights are always integers).
  queryBlockHashes(address: string, fromBlock: number): BlockHashItem[] {
    const rows = this.deps.l1Index.queryLogs({
      contractHash: address,
      event: 'CommitSubmitted',
      fromBlock: fromBlock + 1,
    });
    const sorted = [...rows].sort(compareAsc);
    return sorted.map((row) => {
      const decodedArgs = parseJson<{ blockHash?: string }>(
        row.decoded_args,
        {},
      );
      const rawLog = parseJson<{ blockHash?: string }>(row.raw_log, {});
      return {
        fuelBlockHash: decodedArgs.blockHash ?? null,
        ethBlockHash: rawLog.blockHash ?? null,
      };
    });
  }

  queryMessageRelayedTxHash(
    address: string,
    messageId: string,
  ): MessageRelayedItem[] {
    const rows = this.deps.l1Index.queryLogs({
      contractHash: address,
      event: 'MessageRelayed',
      argKey: 'messageId',
      argValue: messageId,
    });
    const sorted = [...rows].sort(compareAsc);
    return sorted.map((row) => ({ transactionHash: row.tx_hash }));
  }
}
