import type { CosmosEventInput, CosmosIndex } from './CosmosIndex';

const DEFAULT_POLL_MS = 5000;
const MAX_HEIGHTS_PER_TICK = 50;
const START_HEIGHT_LOOKBACK = 200_000;
const FETCH_TIMEOUT_MS = 15_000;
// A read can outlive its AbortSignal.timeout; tick() holds `running` until it settles.
const FETCH_DEADLINE_MS = 20_000;
const REPAIR_CONCURRENCY = 2;
const REPAIR_MISS_TTL_MS = 10 * 60_000;
const REPAIR_ERROR_TTL_MS = 60_000;
// One L1 block can take more than one sequencer block to sync.
const MAX_SYNC_BLOCKS_PER_L1_BLOCK = 10;

type CosmosAttribute = { key: string; value: string };
type CosmosEvent = { type: string; attributes?: CosmosAttribute[] };
type CosmosTxResponse = {
  height: string;
  txhash: string;
  data?: string | null;
  timestamp?: string | null;
  events?: CosmosEvent[];
};

type Opts = {
  index: CosmosIndex;
  restBase: string;
  /** Explicit start height (COSMOS_START_HEIGHT). Undefined defaults to tip - 200,000 on first tick. */
  startHeight?: number;
  pollMs?: number;
  fetchImpl?: typeof fetch;
  onLog?: (msg: string) => void;
};

export function defaultCosmosRestUrl(fuelProviderUrl: string): string {
  let host = '';
  try {
    host = new URL(fuelProviderUrl).host;
  } catch {
    host = fuelProviderUrl;
  }
  const chain = host.includes('testnet') ? 'testnet' : 'mainnet';
  return `https://rest.seq.${chain}.fuel.network`;
}

export class CosmosPoller {
  tip = 0;
  tipAt: string | null = null;
  private timer: NodeJS.Timeout | null = null;
  private running = false;
  private repairsInFlight = new Map<number, Promise<void>>();
  private repairMissUntil = new Map<number, number>();
  private repairSlots = REPAIR_CONCURRENCY;
  private repairQueue: Array<() => void> = [];

  constructor(private readonly opts: Opts) {}

  get cursor(): number | null {
    return this.opts.index.cursor();
  }

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
      const fetchImpl = this.opts.fetchImpl ?? fetch;
      try {
        this.tip = await withDeadline(
          fetchTip(fetchImpl, this.opts.restBase),
          FETCH_DEADLINE_MS,
        );
        this.tipAt = new Date().toISOString();
      } catch (e) {
        this.opts.onLog?.(
          `CosmosPoller: tip fetch failed: ${(e as Error).message}`,
        );
        return;
      }

      if (this.opts.index.cursor() == null) {
        const start =
          this.opts.startHeight ??
          Math.max(1, this.tip - START_HEIGHT_LOOKBACK);
        this.opts.index.setCursor(start - 1);
      }

      for (let i = 0; i < MAX_HEIGHTS_PER_TICK; i++) {
        const cursor = this.opts.index.cursor() as number;
        const height = cursor + 1;
        if (height > this.tip) break;

        let body: { total?: string; tx_responses: CosmosTxResponse[] };
        try {
          body = await withDeadline(
            fetchTxs(fetchImpl, this.opts.restBase, height),
            FETCH_DEADLINE_MS,
          );
        } catch (e) {
          this.opts.onLog?.(
            `CosmosPoller: txs fetch failed at height ${height}: ${(e as Error).message}`,
          );
          break;
        }
        // An empty block still advances the cursor like a non-empty one.
        this.insertTxs(body.tx_responses);
        this.opts.index.setCursor(height);
      }
    } finally {
      this.running = false;
    }
  }

  // Indexes the sequencer block that synced `ethBlockHeight`, for heights the
  // cursor already passed without storing them.
  repairEthBlockSync(ethBlockHeight: number): Promise<void> {
    const inFlight = this.repairsInFlight.get(ethBlockHeight);
    if (inFlight) return inFlight;
    const missUntil = this.repairMissUntil.get(ethBlockHeight);
    if (missUntil !== undefined) {
      if (missUntil > Date.now()) return Promise.resolve();
      this.repairMissUntil.delete(ethBlockHeight);
    }
    const work = this.withRepairSlot(() => this.repair(ethBlockHeight))
      .catch((err) => {
        this.repairMissUntil.set(
          ethBlockHeight,
          Date.now() + REPAIR_ERROR_TTL_MS,
        );
        throw err;
      })
      .finally(() => this.repairsInFlight.delete(ethBlockHeight));
    this.repairsInFlight.set(ethBlockHeight, work);
    return work;
  }

  private async repair(ethBlockHeight: number): Promise<void> {
    const fetchImpl = this.opts.fetchImpl ?? fetch;
    const heights = await withDeadline(
      fetchEthSyncHeights(fetchImpl, this.opts.restBase, ethBlockHeight),
      FETCH_DEADLINE_MS,
    );
    if (heights.length === 0) {
      this.repairMissUntil.set(ethBlockHeight, Date.now() + REPAIR_MISS_TTL_MS);
      return;
    }
    for (const height of heights) {
      const body = await withDeadline(
        fetchTxs(fetchImpl, this.opts.restBase, height),
        FETCH_DEADLINE_MS,
      );
      this.insertTxs(body.tx_responses);
    }
    this.opts.onLog?.(
      `CosmosPoller: repaired sequencer blocks ${heights.join(', ')} for L1 block ${ethBlockHeight}`,
    );
  }

  private async withRepairSlot<T>(work: () => Promise<T>): Promise<T> {
    if (this.repairSlots === 0) {
      await new Promise<void>((resolve) => this.repairQueue.push(resolve));
    } else {
      this.repairSlots--;
    }
    try {
      return await work();
    } finally {
      const next = this.repairQueue.shift();
      if (next) next();
      else this.repairSlots++;
    }
  }

  private insertTxs(txs: CosmosTxResponse[]): void {
    for (const tx of txs) {
      this.opts.index.insertResponse(
        {
          blockHeight: Number(tx.height),
          txHash: tx.txhash,
          data: tx.data ?? null,
          timestamp: tx.timestamp ?? null,
        },
        flattenEvents(tx.events ?? []),
      );
    }
  }
}

// Every attribute of an event gets that event's position within tx.events as
// its `index` (not a running count across attributes).
function flattenEvents(events: CosmosEvent[]): CosmosEventInput[] {
  const rows: CosmosEventInput[] = [];
  let index = 0;
  for (const event of events) {
    for (const attribute of event.attributes ?? []) {
      rows.push({
        type: event.type,
        key: attribute.key,
        value: attribute.value,
        index,
      });
    }
    index++;
  }
  return rows;
}

function withDeadline<T>(work: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`no response after ${ms}ms`)),
      ms,
    );
  });
  return Promise.race([work, deadline]).finally(() => clearTimeout(timer));
}

async function fetchTip(
  fetchImpl: typeof fetch,
  restBase: string,
): Promise<number> {
  const res = await fetchImpl(
    `${restBase}/cosmos/base/tendermint/v1beta1/blocks/latest`,
    { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) },
  );
  const body = (await res.json()) as {
    block?: { header?: { height?: string } };
  };
  const height = Number(body.block?.header?.height);
  if (!Number.isFinite(height)) throw new Error('invalid tip response');
  return height;
}

async function fetchTxs(
  fetchImpl: typeof fetch,
  restBase: string,
  height: number,
): Promise<{ total?: string; tx_responses: CosmosTxResponse[] }> {
  const res = await fetchImpl(
    `${restBase}/cosmos/tx/v1beta1/txs?query=tx.height=${height}&limit=1000&offset=0`,
    { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) },
  );
  // A non-2xx still returns a JSON body without tx_responses; treating that
  // like an empty block would let the caller's cursor advance past a height
  // that was never actually fetched. Throwing here routes it through tick()'s
  // catch, which breaks the loop for this tick instead of advancing.
  if (!res.ok) {
    throw new Error(
      `cosmos txs fetch failed at height ${height}: HTTP ${res.status}`,
    );
  }
  const body = (await res.json()) as {
    total?: string;
    tx_responses?: unknown;
  };
  // Same cursor-poisoning risk as the non-2xx case above, just through the
  // other door: a 200 whose body is missing tx_responses (or has it as
  // something other than an array -- a proxy hiccup, a malformed pagination
  // response) is not a legitimately empty block and must not be treated as
  // one. A genuinely empty block reports `tx_responses: []`, which is fine
  // and falls through below.
  if (!Array.isArray(body.tx_responses)) {
    throw new Error(
      `cosmos txs fetch at height ${height} returned a malformed body: tx_responses is ${typeof body.tx_responses}, not an array`,
    );
  }
  // The node can report a block before its tx search index has it; an empty
  // answer for a block that holds txs must not advance the cursor.
  if (body.tx_responses.length === 0) {
    const blockTxs = await fetchBlockTxCount(fetchImpl, restBase, height);
    if (blockTxs > 0) {
      throw new Error(
        `cosmos txs at height ${height} not indexed yet: block has ${blockTxs} txs`,
      );
    }
  }
  return {
    total: body.total,
    tx_responses: body.tx_responses as CosmosTxResponse[],
  };
}

async function fetchBlockTxCount(
  fetchImpl: typeof fetch,
  restBase: string,
  height: number,
): Promise<number> {
  const res = await fetchImpl(
    `${restBase}/cosmos/base/tendermint/v1beta1/blocks/${height}`,
    { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) },
  );
  if (!res.ok) {
    throw new Error(
      `cosmos block fetch failed at height ${height}: HTTP ${res.status}`,
    );
  }
  const body = (await res.json()) as {
    block?: { data?: { txs?: unknown[] | null } };
  };
  return body.block?.data?.txs?.length ?? 0;
}

async function fetchEthSyncHeights(
  fetchImpl: typeof fetch,
  restBase: string,
  ethBlockHeight: number,
): Promise<number[]> {
  const query = encodeURIComponent(
    `fuelsequencer.bridge.EventEthereumBlockSynced.block_number='"${ethBlockHeight}"'`,
  );
  const res = await fetchImpl(
    `${restBase}/cosmos/tx/v1beta1/txs?query=${query}&limit=${MAX_SYNC_BLOCKS_PER_L1_BLOCK}`,
    { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) },
  );
  if (!res.ok) {
    throw new Error(
      `cosmos sync lookup failed for L1 block ${ethBlockHeight}: HTTP ${res.status}`,
    );
  }
  const body = (await res.json()) as {
    tx_responses?: Array<{ height?: string }>;
  };
  const heights = (body.tx_responses ?? [])
    .map((tx) => Number(tx.height))
    .filter((h) => Number.isFinite(h) && h > 0);
  return [...new Set(heights)];
}
