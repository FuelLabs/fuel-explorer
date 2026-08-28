import type { GQLBlock } from '~/graphql/generated/sdk-provider';

// Rolling 1000ms window token bucket: at most `maxPerSecond` calls may start
// within any trailing 1000ms span. Calls beyond that wait for the oldest call
// in the window to age out before proceeding.
export class RpcBlockSource {
  private readonly callTimes: number[] = [];

  constructor(
    private readonly client: {
      blockJson(height: number): Promise<GQLBlock | null>;
    },
    private readonly maxPerSecond: number,
  ) {}

  async load(height: number): Promise<GQLBlock | null> {
    await this.acquire();
    const block = await this.client.blockJson(height);
    return block ? withStatusBlock(block) : null;
  }

  private async acquire(): Promise<void> {
    for (;;) {
      const now = Date.now();
      while (this.callTimes.length > 0 && now - this.callTimes[0] >= 1000) {
        this.callTimes.shift();
      }
      if (this.callTimes.length < this.maxPerSecond) {
        this.callTimes.push(now);
        return;
      }
      const waitMs = 1000 - (now - this.callTimes[0]);
      await new Promise((resolve) => setTimeout(resolve, Math.max(waitMs, 0)));
    }
  }
}

// fuel-core's block document does not select status.block, but the explorer
// schema declares it non-null on SuccessStatus and FailureStatus.
export function withStatusBlock(block: GQLBlock): GQLBlock {
  const h = (block.header ?? {}) as Record<string, unknown>;
  const ref = {
    __typename: 'Block',
    id: block.id,
    height: block.height,
    header: {
      __typename: 'Header',
      id: block.id,
      height: block.height,
      daHeight: h.daHeight,
      applicationHash: h.applicationHash,
      messageReceiptCount: h.messageReceiptCount,
      time: h.time,
    },
  };
  for (const tx of (block.transactions ?? []) as Array<
    Record<string, unknown>
  >) {
    const status = tx.status as Record<string, unknown> | null | undefined;
    if (!status) continue;
    const t = status.__typename;
    if (t !== 'SuccessStatus' && t !== 'FailureStatus') continue;
    if (!status.block) status.block = ref;
    if (!status.transactionId) status.transactionId = tx.id;
  }
  return block;
}
