import { RpcBlockSource } from './RpcBlockSource';

function fakeBlock(height: number) {
  return {
    __typename: 'Block',
    height: String(height),
    id: `0x${height}`,
  } as any;
}

describe('RpcBlockSource', () => {
  it('returns null when fuel-core has no block at that height', async () => {
    const client = { blockJson: async () => null };
    const source = new RpcBlockSource(client, 5);
    expect(await source.load(999999)).toBeNull();
  });

  it('returns the block fuel-core supplies', async () => {
    const client = { blockJson: async (h: number) => fakeBlock(h) };
    const source = new RpcBlockSource(client, 5);
    expect(await source.load(7)).toEqual(fakeBlock(7));
  });

  describe('limiter', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('allows at most maxPerSecond calls per rolling 1000ms window, delaying the rest', async () => {
      const calls: number[] = [];
      const client = {
        blockJson: async (h: number) => {
          calls.push(h);
          return fakeBlock(h);
        },
      };
      const source = new RpcBlockSource(client, 2);

      const results = [source.load(1), source.load(2), source.load(3)];
      await jest.advanceTimersByTimeAsync(0);
      expect(calls).toEqual([1, 2]);

      await jest.advanceTimersByTimeAsync(1000);
      expect(calls).toEqual([1, 2, 3]);

      await Promise.all(results);
    });
  });
});
