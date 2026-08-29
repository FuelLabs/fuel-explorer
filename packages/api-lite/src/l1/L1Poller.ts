import { type Abi, decodeEventLog } from 'viem';
import type { ContractCursor, L1Index, L1LogRow } from './L1Index';
import AbiFactory from './abi/AbiFactory';
import { decodeMessage } from './decodeMessage';
import { eventSignature } from './eventSignature';

export type L1Log = {
  address: string;
  topics: string[];
  data: string;
  blockNumber: bigint;
  blockHash: string;
  transactionHash: string;
  logIndex: number;
};

export type L1Client = {
  getFinalizedBlockNumber(): Promise<bigint>;
  getLogs(args: {
    address: string;
    fromBlock: bigint;
    toBlock: bigint;
  }): Promise<L1Log[]>;
  getBlockTimestamp(blockNumber: bigint): Promise<number>;
};

const WINDOW_BLOCKS = 1000n;
const DEFAULT_POLL_MS = 30_000;
const DEFAULT_THROTTLE_MS = 1000;

type Opts = {
  index: Pick<L1Index, 'cursor' | 'advance' | 'insertLogs' | 'contracts'>;
  client: L1Client;
  network: 'mainnet' | 'testnet';
  pollMs?: number;
  /** Minimum delay between two contracts' getLogs calls within one tick. */
  throttleMs?: number;
  onLog?: (message: string) => void;
};

export class L1Poller {
  private timer: NodeJS.Timeout | null = null;
  private running = false;

  constructor(private readonly opts: Opts) {}

  start(): void {
    this.timer = setInterval(
      () => void this.tick(),
      this.opts.pollMs ?? DEFAULT_POLL_MS,
    );
    void this.tick();
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  async tick(): Promise<void> {
    if (this.running) return;
    this.running = true;
    try {
      const contracts = this.opts.index.contracts(this.opts.network);
      for (let i = 0; i < contracts.length; i++) {
        if (i > 0)
          await this.sleep(this.opts.throttleMs ?? DEFAULT_THROTTLE_MS);
        await this.syncContract(contracts[i]);
      }
    } finally {
      this.running = false;
    }
  }

  private sleep(ms: number): Promise<void> {
    if (ms <= 0) return Promise.resolve();
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private log(message: string): void {
    (this.opts.onLog ?? ((m: string) => console.warn(m)))(message);
  }

  // Exposed (not private) so tests can drive one contract's window without
  // seeding and throttling through all seven.
  async syncContract(
    contract: Pick<ContractCursor, 'contract_hash' | 'block_height' | 'name'>,
  ): Promise<void> {
    let finalized: bigint;
    try {
      finalized = await this.opts.client.getFinalizedBlockNumber();
    } catch (err) {
      this.log(
        `L1Poller: ${contract.name} - failed to fetch finalized block: ${String(err)}`,
      );
      return;
    }
    // block_height is the next unprocessed block: seed() stores the start
    // block there, and advance() below sets it to toBlock + 1.
    const fromBlock = BigInt(contract.block_height);
    if (fromBlock > finalized) return;
    const windowCap = fromBlock + WINDOW_BLOCKS - 1n;
    const toBlock = windowCap < finalized ? windowCap : finalized;

    const abi = AbiFactory.create(this.opts.network, contract.name) as
      | Abi
      | undefined;
    if (!abi) {
      this.log(
        `L1Poller: ${contract.name} - no ABI for network ${this.opts.network}`,
      );
      return;
    }

    let logs: L1Log[];
    try {
      logs = await this.opts.client.getLogs({
        address: contract.contract_hash,
        fromBlock,
        toBlock,
      });
    } catch (err) {
      this.log(`L1Poller: ${contract.name} - getLogs failed: ${String(err)}`);
      return; // cursor unchanged, retried next tick
    }

    const rows: L1LogRow[] = [];
    const timestamps = new Map<bigint, number>();
    for (const l of logs) {
      let decoded: { eventName: string; args: unknown };
      try {
        decoded = decodeEventLog({
          abi,
          data: l.data as `0x${string}`,
          topics: l.topics as [`0x${string}`, ...`0x${string}`[]] | [],
        }) as { eventName: string; args: unknown };
      } catch (err) {
        this.log(
          `L1Poller: ${contract.name} - undecodable log at block ${l.blockNumber} tx ${l.transactionHash}: ${String(err)}`,
        );
        continue;
      }
      let timestamp = timestamps.get(l.blockNumber);
      if (timestamp === undefined) {
        try {
          timestamp = await this.opts.client.getBlockTimestamp(l.blockNumber);
        } catch (err) {
          this.log(
            `L1Poller: ${contract.name} - failed to fetch block ${l.blockNumber} timestamp, retrying next tick: ${String(err)}`,
          );
          // Stop here (don't advance the cursor) rather than write this log
          // with a fallback timestamp of 0 - a bad timestamp would poison
          // downstream date-ordered queries.
          return;
        }
        timestamps.set(l.blockNumber, timestamp);
      }
      const decodedArgs = decoded.args as Record<string, unknown>;
      const decodedData = decodeMessage((decodedArgs.data as string) ?? '');
      const args = { ...decodedArgs, ...decodedData };
      rows.push({
        contractHash: contract.contract_hash,
        blockHeight: Number(l.blockNumber),
        txHash: l.transactionHash,
        event: decoded.eventName,
        signature: eventSignature(abi, decoded.eventName),
        rawLog: JSON.stringify(l, (_key, v) =>
          typeof v === 'bigint' ? v.toString() : v,
        ),
        decodedArgs: JSON.stringify(decodedArgs, (_key, v) =>
          typeof v === 'bigint' ? v.toString() : v,
        ),
        decodedData: JSON.stringify(decodedData),
        timestamp: new Date(timestamp * 1000).toISOString(),
        logIndex: l.logIndex,
        args,
      });
    }
    this.opts.index.insertLogs(rows);
    this.opts.index.advance(contract.contract_hash, Number(toBlock) + 1);
  }
}
