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
    return this.client.blockJson(height);
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
