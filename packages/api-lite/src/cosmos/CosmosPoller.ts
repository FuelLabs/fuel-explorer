import type { CosmosEventInput, CosmosIndex } from './CosmosIndex';

const DEFAULT_POLL_MS = 5000;
const MAX_HEIGHTS_PER_TICK = 50;
const START_HEIGHT_LOOKBACK = 200_000;
const FETCH_TIMEOUT_MS = 15_000;

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
  private timer: NodeJS.Timeout | null = null;
  private running = false;

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
        this.tip = await fetchTip(fetchImpl, this.opts.restBase);
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

        let body: { total?: string; tx_responses?: CosmosTxResponse[] };
        try {
          body = await fetchTxs(fetchImpl, this.opts.restBase, height);
        } catch (e) {
          this.opts.onLog?.(
            `CosmosPoller: txs fetch failed at height ${height}: ${(e as Error).message}`,
          );
          break;
        }
        const txResponses = Array.isArray(body.tx_responses)
          ? body.tx_responses
          : [];

        // An empty block still advances the cursor like a non-empty one.
        for (const tx of txResponses) {
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
        this.opts.index.setCursor(height);
      }
    } finally {
      this.running = false;
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
): Promise<{ total?: string; tx_responses?: CosmosTxResponse[] }> {
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
  return (await res.json()) as {
    total?: string;
    tx_responses?: CosmosTxResponse[];
  };
}
