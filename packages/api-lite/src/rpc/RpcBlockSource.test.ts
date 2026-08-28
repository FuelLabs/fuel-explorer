import { RpcBlockSource, withStatusBlock } from './RpcBlockSource';

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

describe('withStatusBlock', () => {
  it('fills status.block and transactionId from the block header', () => {
    const block = {
      id: '0xb',
      height: '7',
      header: {
        daHeight: '1',
        applicationHash: '0xa',
        messageReceiptCount: '0',
        time: '4611686020140000000',
      },
      transactions: [
        { id: '0x1', status: { __typename: 'SuccessStatus' } },
        { id: '0x2', status: { __typename: 'SubmittedStatus' } },
        { id: '0x3', status: null },
      ],
    } as any;
    const out = withStatusBlock(block) as any;
    expect(out.transactions[0].status.block.header.height).toBe('7');
    expect(out.transactions[0].status.block.id).toBe('0xb');
    expect(out.transactions[0].status.transactionId).toBe('0x1');
    expect(out.transactions[1].status.block).toBeUndefined();
    expect(out.transactions[2].status).toBeNull();
  });
});
