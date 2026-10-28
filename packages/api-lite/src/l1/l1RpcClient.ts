import { http, type PublicClient, createPublicClient, fallback } from 'viem';

export type L1RpcStatus = {
  fallbackConfigured: boolean;
  servedBy: 'primary' | 'fallback' | null;
  primary: {
    ok: boolean;
    // Seconds the primary has been failing without a single success, so a
    // monitor can ignore one-off blips and alert on a sustained outage.
    downSeconds: number;
    lastError: string | null;
  };
  lastSuccessAt: string | null;
};

// viem's error messages embed the request URL, and RPC URLs carry the API
// key, so only the error name, HTTP status and the provider's own message
// (with any URL stripped) reach logs and /health.
function describeError(err: unknown): string {
  const e = err as { name?: string; status?: number; details?: string };
  const status = e.status ? ` ${e.status}` : '';
  const details = (e.details ?? '')
    .replace(/https?:\/\/\S+/g, '<url>')
    .slice(0, 160);
  return `${e.name ?? 'Error'}${status}${details ? `: ${details}` : ''}`;
}

export class L1RpcHealth {
  private primaryFailingSince: number | null = null;
  private primaryLastError: string | null = null;
  private servedBy: L1RpcStatus['servedBy'] = null;
  private lastSuccessAt: number | null = null;

  constructor(
    private readonly fallbackConfigured: boolean,
    private readonly log: (message: string) => void = console.log,
    private readonly now: () => number = Date.now,
  ) {}

  recordPrimary(ok: boolean, err?: unknown): void {
    if (ok) {
      if (this.primaryFailingSince !== null) {
        this.log('L1 RPC: primary recovered');
      }
      this.primaryFailingSince = null;
      this.primaryLastError = null;
      this.servedBy = 'primary';
      this.lastSuccessAt = this.now();
      return;
    }
    this.primaryLastError = describeError(err);
    if (this.primaryFailingSince === null) {
      this.primaryFailingSince = this.now();
      this.log(
        `L1 RPC: primary failing (${this.primaryLastError})${
          this.fallbackConfigured ? ', serving from fallback' : ''
        }`,
      );
    }
  }

  recordFallback(ok: boolean): void {
    if (!ok) return;
    this.servedBy = 'fallback';
    this.lastSuccessAt = this.now();
  }

  status(): L1RpcStatus {
    const now = this.now();
    return {
      fallbackConfigured: this.fallbackConfigured,
      servedBy: this.servedBy,
      primary: {
        ok: this.primaryFailingSince === null,
        downSeconds:
          this.primaryFailingSince === null
            ? 0
            : Math.floor((now - this.primaryFailingSince) / 1000),
        lastError: this.primaryLastError,
      },
      lastSuccessAt:
        this.lastSuccessAt === null
          ? null
          : new Date(this.lastSuccessAt).toISOString(),
    };
  }
}

// Primary first, fallback only when the primary call fails. Ranking stays off
// so a healthy primary is never skipped for a faster public node.
export function createL1RpcClient(
  primaryUrl: string,
  fallbackUrl?: string,
): { client: PublicClient; health: L1RpcHealth } {
  const health = new L1RpcHealth(Boolean(fallbackUrl));
  const urls = fallbackUrl ? [primaryUrl, fallbackUrl] : [primaryUrl];
  const transport = fallback(
    urls.map((url) => http(url)),
    { rank: false },
  );
  const client = createPublicClient({ transport });
  client.transport.onResponse(({ status, error, transport: used }) => {
    const usedUrl = (used.value as { url?: string } | undefined)?.url;
    if (usedUrl === primaryUrl)
      health.recordPrimary(status === 'success', error);
    else health.recordFallback(status === 'success');
  });
  return { client, health };
}
