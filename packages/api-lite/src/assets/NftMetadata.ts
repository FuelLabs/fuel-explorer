// ipfs.io and dweb.link answer server-side requests with a 429 "service worker
// gateway only" page, so collection JSON and image links go through Pinata's.
const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

type Collection = { name: string; url: string };

// Carried over from the retired indexer's indexer.collections table
// (migration 008). Only these contracts ever had off-chain metadata: their
// tokens have no SRC20 name/symbol or SRC7 metadata on-chain. `{subId}` is
// the decimal token number.
const COLLECTIONS: Record<string, Collection> = {
  '0x45c964371490bdfc2610ca116853d22a9b6e0de1abb67f61b81ab9d291b0015c': {
    name: 'Fuel Pumps',
    url: `${IPFS_GATEWAY}QmXyd5j7dDaYDuXZZ62uqh5CsrG9nUXNy7eQmedxEEwU25/{subId}.json`,
  },
  '0x3f3f87bb15c693784e90521c64bac855ce23d971356a6ccd57aa92e02e696432': {
    name: 'Executoors',
    url: `${IPFS_GATEWAY}bafybeif44cbambuyvtfhk6lbaozshy4xs3p4saeqnizxlon4age6pkr2ua/{subId}.json`,
  },
  '0x0d34ec513cbaf7e15737120725cd3e235a8fd1716fa0eedc5da4a64c182e5a9f': {
    name: 'FuelMonkees',
    url: 'https://gateway.lighthouse.storage/ipfs/bafybeidfwggiv7mjxbrrtpozsdhknl3hyhwyzmzesqiulvflpehhxdsjii/Monkee%20{subId}.json',
  },
  '0xaa919d413a57cb6c577b2e172480cbe2f88df0e28203fed52249cabca6cee74a': {
    name: 'Fuel Pengus',
    url: `${IPFS_GATEWAY}QmNZqtRxyyuh1nbXUapSgCmGTW2GofXERZzkLBmwVxjmES/{subId}.json`,
  },
};

const HIT_TTL_MS = 24 * 60 * 60 * 1000;
const MISS_TTL_MS = 5 * 60 * 1000;
const CACHE_MAX = 5000;
const FETCH_TIMEOUT_MS = 15_000;

type Metadata = Record<string, unknown>;

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
  private readonly cache = new Map<
    string,
    { at: number; value: Metadata | null }
  >();
  private readonly inflight = new Map<string, Promise<Metadata | null>>();
  private readonly fetchImpl: typeof fetch;
  private readonly now: () => number;

  constructor(opts: Opts = {}) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
    this.now = opts.now ?? Date.now;
  }

  // Off-chain token JSON for a known collection, null for any other contract
  // or when the gateway fails. A fetch keeps running (and fills the cache)
  // after a caller stops waiting for it.
  async get(contractId: string, subId: string): Promise<Metadata | null> {
    const collection = COLLECTIONS[contractId.toLowerCase()];
    if (!collection) return null;
    const key = `${contractId.toLowerCase()}:${subId.toLowerCase()}`;

    const cached = this.cache.get(key);
    if (cached) {
      const ttl = cached.value ? HIT_TTL_MS : MISS_TTL_MS;
      if (this.now() - cached.at < ttl) return cached.value;
      this.cache.delete(key);
    }

    let pending = this.inflight.get(key);
    if (!pending) {
      pending = this.fetchJson(collection, subId).then((value) => {
        this.inflight.delete(key);
        this.cache.set(key, { at: this.now(), value });
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
    collection: Collection,
    subId: string,
  ): Promise<Metadata | null> {
    const url = collection.url.replace('{subId}', BigInt(subId).toString());
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
