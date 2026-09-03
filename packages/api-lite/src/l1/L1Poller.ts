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
// Caps one contract's catch-up work within a single tick so the tick always
// ends; a contract that is still behind after 120 windows resumes on the
// next tick.
const MAX_WINDOWS_PER_TICK = 120;

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

  // Exposed (not private) so tests can drive one contract's window(s)
  // without seeding and throttling through all seven.
  //
  // Fetches the finalized tip once, then processes consecutive windows for
  // this one contract - throttled at one window per throttleMs - until the
  // cursor reaches that tip or MAX_WINDOWS_PER_TICK windows have run, so this
  // call (and the tick that made it) always terminates; a contract still
  // behind after the cap resumes on the next tick.
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
    let cursor = BigInt(contract.block_height);
    if (cursor > finalized) return;

    const abi = AbiFactory.create(this.opts.network, contract.name) as
      | Abi
      | undefined;
    if (!abi) {
      this.log(
        `L1Poller: ${contract.name} - no ABI for network ${this.opts.network}`,
      );
      return;
    }

    for (
      let windowCount = 0;
      windowCount < MAX_WINDOWS_PER_TICK && cursor <= finalized;
      windowCount++
    ) {
      if (windowCount > 0) {
        await this.sleep(this.opts.throttleMs ?? DEFAULT_THROTTLE_MS);
      }
      const fromBlock = cursor;
      const windowCap = fromBlock + WINDOW_BLOCKS - 1n;
      const toBlock = windowCap < finalized ? windowCap : finalized;

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
      let timestampFetchFailed = false;
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
            // Stop here (don't advance the cursor, don't write this
            // window's rows) rather than write this log with a fallback
            // timestamp of 0 - a bad timestamp would poison downstream
            // date-ordered queries. Windows already advanced earlier in
            // this tick stay committed.
            timestampFetchFailed = true;
            break;
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
      if (timestampFetchFailed) return;

      this.opts.index.insertLogs(rows);
      this.opts.index.advance(contract.contract_hash, Number(toBlock) + 1);
      cursor = toBlock + 1n;
    }
  }
}
