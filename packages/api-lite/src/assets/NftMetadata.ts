import {
  IpfsBusyError,
  type IpfsFile,
  type IpfsGateway,
  ipfsRef,
  publicGatewayUrl,
} from './IpfsGateway';

// A collection without `files` has no reachable metadata source left and is
// only named.
type Collection = { name: string; files?: string };

// Collections whose token metadata lives off-chain, as `<cid>/<path>` with
// `{subId}` standing for the decimal token number.
const COLLECTIONS: Record<string, Collection> = {
  '0x45c964371490bdfc2610ca116853d22a9b6e0de1abb67f61b81ab9d291b0015c': {
    name: 'Fuel Pumps',
    files: 'QmXyd5j7dDaYDuXZZ62uqh5CsrG9nUXNy7eQmedxEEwU25/{subId}.json',
  },
  '0x3f3f87bb15c693784e90521c64bac855ce23d971356a6ccd57aa92e02e696432': {
    name: 'Executoors',
  },
  '0x0d34ec513cbaf7e15737120725cd3e235a8fd1716fa0eedc5da4a64c182e5a9f': {
    name: 'FuelMonkees',
    files:
      'bafybeidfwggiv7mjxbrrtpozsdhknl3hyhwyzmzesqiulvflpehhxdsjii/Monkee%20{subId}.json',
  },
  '0xaa919d413a57cb6c577b2e172480cbe2f88df0e28203fed52249cabca6cee74a': {
    name: 'Fuel Pengus',
    files: 'QmNZqtRxyyuh1nbXUapSgCmGTW2GofXERZzkLBmwVxjmES/{subId}.json',
  },
  '0x65aa85875bf92fb5b487ade154f88507d74b233ef901b4a172f4616b527a4784': {
    name: 'Fuel Dudes',
    files: 'QmYvaFhBXHXDiccmZnh17gPCT8R62EyY1KWyLz7Zz6dJd4/{subId}.json',
  },
  '0x4365ec565b25febe517770709edb54f081fc67fbb4f561ac53b2b608371079db': {
    name: 'Fuel Rocks',
  },
  '0xb03ec5c6eeaf6d09ed6755e21dff896234c8f509b813f3ff17ef14a436fa8462': {
    name: 'Sangoro',
    files: 'QmQJjbRChfHyaYPutY2ZBuJqByfseVNG5bwz7gSuQeYESU/{subId}.json',
  },
  '0x59b10bd361740618f12bba00f1083ef304a294b37ed7a8756c1b9cfc9b491b16': {
    name: 'Fuel BomBa',
    files: 'QmSY7YZGZtY6nWsAm7Wr9bgA36ZahPxYiYBA241m3BFyyS/{subId}.json',
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
    files:
      'bafybeia65kpvylfbv7t2tg2qy54ivgckp3dhvcx7zbqvvn7xiedjbcbf6m/{subId}_AQF.json',
  },
  '0xc5c219d360dcddbdaad2e0a33afc3550794ed4dfc484efb13562023189a08851': {
    name: 'Alien Inva NFT',
    files:
      'bafybeib4owydunce3koezxs7odwoemxydgfahizxqxylrbmcycj54rrpw4/{subId}.json',
  },
};

// IPFS content never changes, so a hit is kept until evicted. Failures back off
// exponentially, since most of them are content nobody pins anymore.
const RETRY_MIN_MS = 60_000;
const RETRY_MAX_MS = 24 * 60 * 60_000;
const CACHE_MAX = 5000;

type Metadata = Record<string, unknown>;

const BUSY = Symbol('busy');

type CacheEntry =
  | { value: Metadata }
  | { value: null; failures: number; retryAt: number };

type Opts = {
  gateway: Pick<IpfsGateway, 'fetch'>;
  // Base URL this api is served from; images are then served through its
  // /ipfs route instead of a public gateway.
  publicUrl?: string;
  now?: () => number;
};

export function collectionFor(contractId: string | null): string | null {
  return contractId
    ? (COLLECTIONS[contractId.toLowerCase()]?.name ?? null)
    : null;
}

export class NftMetadata {
  private readonly cache = new Map<string, CacheEntry>();
  private readonly inflight = new Map<string, Promise<Metadata | null>>();
  private readonly gateway: Pick<IpfsGateway, 'fetch'>;
  private readonly publicUrl?: string;
  private readonly now: () => number;

  constructor(opts: Opts) {
    this.gateway = opts.gateway;
    this.publicUrl = opts.publicUrl?.replace(/\/+$/, '');
    this.now = opts.now ?? Date.now;
  }

  // A fetch keeps running and fills the cache after a caller stops waiting.
  async get(contractId: string, subId: string): Promise<Metadata | null> {
    const files = COLLECTIONS[contractId.toLowerCase()]?.files;
    if (!files) return null;
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
      const ref = files.replace('{subId}', BigInt(subId).toString());
      pending = this.fetchJson(ref).then((value) => {
        this.inflight.delete(key);
        // The gateway was full, which says nothing about the content, so the
        // next request tries again.
        if (value === BUSY) return null;
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

  private async fetchJson(ref: string): Promise<Metadata | null | typeof BUSY> {
    let file: IpfsFile | null;
    try {
      file = await this.gateway.fetch(ref);
    } catch (e) {
      if (e instanceof IpfsBusyError) return BUSY;
      console.error(`NftMetadata: ${ref} failed: ${(e as Error).message}`);
      return null;
    }
    if (!file) return null;
    let json: unknown;
    try {
      json = JSON.parse(file.body.toString('utf8'));
    } catch {
      console.error(`NftMetadata: ${ref} is not JSON`);
      return null;
    }
    if (!json || typeof json !== 'object') return null;
    return this.withServedImage(json as Metadata);
  }

  private withServedImage(metadata: Metadata): Metadata {
    const { image } = metadata;
    const ref = typeof image === 'string' ? ipfsRef(image) : null;
    if (!ref) return metadata;
    return {
      ...metadata,
      image: this.publicUrl
        ? `${this.publicUrl}/ipfs/${ref}`
        : publicGatewayUrl(ref),
    };
  }
}
