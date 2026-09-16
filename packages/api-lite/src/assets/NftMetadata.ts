// ipfs.io and dweb.link reject server-side requests with a 429.
const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

// A collection without a `url` has no reachable metadata source left and is
// only named.
type Collection = { name: string; url?: string };

// Collections whose token metadata lives off-chain. `{subId}` is the decimal
// token number.
const COLLECTIONS: Record<string, Collection> = {
  '0x45c964371490bdfc2610ca116853d22a9b6e0de1abb67f61b81ab9d291b0015c': {
    name: 'Fuel Pumps',
    url: `${IPFS_GATEWAY}QmXyd5j7dDaYDuXZZ62uqh5CsrG9nUXNy7eQmedxEEwU25/{subId}.json`,
  },
  '0x3f3f87bb15c693784e90521c64bac855ce23d971356a6ccd57aa92e02e696432': {
    name: 'Executoors',
  },
  '0x0d34ec513cbaf7e15737120725cd3e235a8fd1716fa0eedc5da4a64c182e5a9f': {
    name: 'FuelMonkees',
    url: 'https://gateway.lighthouse.storage/ipfs/bafybeidfwggiv7mjxbrrtpozsdhknl3hyhwyzmzesqiulvflpehhxdsjii/Monkee%20{subId}.json',
  },
  '0xaa919d413a57cb6c577b2e172480cbe2f88df0e28203fed52249cabca6cee74a': {
    name: 'Fuel Pengus',
    url: `${IPFS_GATEWAY}QmNZqtRxyyuh1nbXUapSgCmGTW2GofXERZzkLBmwVxjmES/{subId}.json`,
  },
  '0x65aa85875bf92fb5b487ade154f88507d74b233ef901b4a172f4616b527a4784': {
    name: 'Fuel Dudes',
    url: `${IPFS_GATEWAY}QmYvaFhBXHXDiccmZnh17gPCT8R62EyY1KWyLz7Zz6dJd4/{subId}.json`,
  },
  '0x4365ec565b25febe517770709edb54f081fc67fbb4f561ac53b2b608371079db': {
    name: 'Fuel Rocks',
  },
  '0xb03ec5c6eeaf6d09ed6755e21dff896234c8f509b813f3ff17ef14a436fa8462': {
    name: 'Sangoro',
    url: `${IPFS_GATEWAY}QmQJjbRChfHyaYPutY2ZBuJqByfseVNG5bwz7gSuQeYESU/{subId}.json`,
  },
  '0x59b10bd361740618f12bba00f1083ef304a294b37ed7a8756c1b9cfc9b491b16': {
    name: 'Fuel BomBa',
    url: `${IPFS_GATEWAY}QmSY7YZGZtY6nWsAm7Wr9bgA36ZahPxYiYBA241m3BFyyS/{subId}.json`,
  },
  '0x0c10a1c5ef62b346a27a16cc4c270f5e74c1c94a7f8233fcf0223716b6c9f326': {
    name: 'Griffy Amplify',
  },
  '0xf0b6e2320caccb9071e45b1150b4da6f5edf74e7375ac6c87084822a87832de2': {
    name: 'BearBros',
  },
  '0x202b55f66b8bafaf3b4fdf0653f1a4320607781dbd368bb576bc09250dd7dbbe': {
    name: 'Koby',
  },
  '0x5d0188a9f77c4e5e48c459b5d02ccedac1a26d45b9f9c9e886f8563395bad32d': {
    name: 'AI Quantum Flux',
    url: `${IPFS_GATEWAY}bafybeia65kpvylfbv7t2tg2qy54ivgckp3dhvcx7zbqvvn7xiedjbcbf6m/{subId}_AQF.json`,
  },
  '0xc5c219d360dcddbdaad2e0a33afc3550794ed4dfc484efb13562023189a08851': {
    name: 'Alien Inva NFT',
    url: 'https://ipfs.filebase.io/ipfs/bafybeib4owydunce3koezxs7odwoemxydgfahizxqxylrbmcycj54rrpw4/{subId}.json',
  },
};

// IPFS content never changes, so a hit is kept until evicted. Failures back off
// exponentially, since most of them are content nobody pins anymore.
const RETRY_MIN_MS = 60_000;
const RETRY_MAX_MS = 24 * 60 * 60_000;
const CACHE_MAX = 5000;
const FETCH_TIMEOUT_MS = 15_000;

type Metadata = Record<string, unknown>;

type CacheEntry =
  | { value: Metadata }
  | { value: null; failures: number; retryAt: number };

type Opts = {
  fetchImpl?: typeof fetch;
  now?: () => number;
};

export function collectionFor(contractId: string | null): string | null {
  return contractId
    ? (COLLECTIONS[contractId.toLowerCase()]?.name ?? null)
    : null;
}

function withGatewayImage(metadata: Metadata): Metadata {
  const { image } = metadata;
  if (typeof image !== 'string' || !image.startsWith('ipfs://')) {
    return metadata;
  }
  return { ...metadata, image: `${IPFS_GATEWAY}${image.slice(7)}` };
}

export class NftMetadata {
  private readonly cache = new Map<string, CacheEntry>();
  private readonly inflight = new Map<string, Promise<Metadata | null>>();
  private readonly fetchImpl: typeof fetch;
  private readonly now: () => number;

  constructor(opts: Opts = {}) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
    this.now = opts.now ?? Date.now;
  }

  // A fetch keeps running and fills the cache after a caller stops waiting.
  async get(contractId: string, subId: string): Promise<Metadata | null> {
    const url = COLLECTIONS[contractId.toLowerCase()]?.url;
    if (!url) return null;
    const key = `${contractId.toLowerCase()}:${subId.toLowerCase()}`;

    const cached = this.cache.get(key);
    if (cached) {
      this.cache.delete(key);
      this.cache.set(key, cached);
      if (cached.value || this.now() < cached.retryAt) return cached.value;
    }

    let pending = this.inflight.get(key);
    if (!pending) {
      const failures = cached && !cached.value ? cached.failures : 0;
      pending = this.fetchJson(url, subId).then((value) => {
        this.inflight.delete(key);
        this.cache.delete(key);
        this.cache.set(
          key,
          value
            ? { value }
            : {
                value: null,
                failures: failures + 1,
                retryAt:
                  this.now() +
                  Math.min(RETRY_MIN_MS * 2 ** failures, RETRY_MAX_MS),
              },
        );
        if (this.cache.size > CACHE_MAX) {
          const oldest = this.cache.keys().next().value;
          if (oldest !== undefined) this.cache.delete(oldest);
        }
        return value;
      });
      this.inflight.set(key, pending);
    }
    return pending;
  }

  private async fetchJson(
    template: string,
    subId: string,
  ): Promise<Metadata | null> {
    const url = template.replace('{subId}', BigInt(subId).toString());
    try {
      const res = await this.fetchImpl(url, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!res.ok) {
        console.error(`NftMetadata: ${url} answered ${res.status}`);
        return null;
      }
      const json = (await res.json()) as unknown;
      if (!json || typeof json !== 'object') return null;
      return withGatewayImage(json as Metadata);
    } catch (e) {
      console.error(`NftMetadata: ${url} failed: ${(e as Error).message}`);
      return null;
    }
  }
}
