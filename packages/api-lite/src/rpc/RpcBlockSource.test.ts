import {
  RpcBlockSource,
  isTransientNetworkError,
  withStatusBlock,
} from './RpcBlockSource';

function fakeBlock(height: number) {
  return {
    __typename: 'Block',
    height: String(height),
    id: `0x${height}`,
  } as any;
}

function transientError() {
  const err = new TypeError('fetch failed');
  (err as { cause?: unknown }).cause = { code: 'UND_ERR_SOCKET' };
  return err;
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

  describe('retry on transient network error', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('retries once after a transient error and resolves with the block', async () => {
      let calls = 0;
      const client = {
        blockJson: async (h: number) => {
          calls++;
          if (calls === 1) throw transientError();
          return fakeBlock(h);
        },
      };
      const source = new RpcBlockSource(client, 5);

      const resultP = source.load(42);
      await jest.advanceTimersByTimeAsync(250);
      expect(await resultP).toEqual(fakeBlock(42));
      expect(calls).toBe(2);
    });

    it('rejects unchanged when the retry also fails', async () => {
      let calls = 0;
      const client = {
        blockJson: async () => {
          calls++;
          throw transientError();
        },
      };
      const source = new RpcBlockSource(client, 5);

      const resultP = source.load(42);
      // Attach a rejection handler before advancing timers so Node doesn't
      // flag the eventual rejection as unhandled while it is pending.
      const assertion = expect(resultP).rejects.toThrow('fetch failed');
      await jest.advanceTimersByTimeAsync(250);
      await assertion;
      expect(calls).toBe(2);
    });

    it('does not retry an HTTP-shaped error', async () => {
      let calls = 0;
      const client = {
        blockJson: async () => {
          calls++;
          throw new Error('fuel-core: some GraphQL error');
        },
      };
      const source = new RpcBlockSource(client, 5);

      await expect(source.load(42)).rejects.toThrow(
        'fuel-core: some GraphQL error',
      );
      expect(calls).toBe(1);
    });

    it('honours the token bucket for the retry acquire, not just the 250ms delay', async () => {
      let calls = 0;
      const client = {
        blockJson: async (h: number) => {
          calls++;
          if (calls === 1) throw transientError();
          return fakeBlock(h);
        },
      };
      const source = new RpcBlockSource(client, 1); // 1/second, so the retry must wait out the window too

      const resultP = source.load(42);
      await jest.advanceTimersByTimeAsync(250);
      expect(calls).toBe(1); // retry delay elapsed but the bucket still holds the first slot

      await jest.advanceTimersByTimeAsync(750);
      expect(await resultP).toEqual(fakeBlock(42));
      expect(calls).toBe(2);
    });
  });
});

describe('isTransientNetworkError', () => {
  it('matches known transient undici cause codes', () => {
    for (const code of [
      'UND_ERR_SOCKET',
      'UND_ERR_CONNECT_TIMEOUT',
      'ECONNRESET',
      'EPIPE',
      'ETIMEDOUT',
    ]) {
      const err = new TypeError('terminated');
      (err as { cause?: unknown }).cause = { code };
      expect(isTransientNetworkError(err)).toBe(true);
    }
  });

  it('matches a bare "fetch failed" TypeError', () => {
    expect(isTransientNetworkError(new TypeError('fetch failed'))).toBe(true);
  });

  it('does not match an HTTP-level error (4xx/5xx or JSON parse failure)', () => {
    expect(isTransientNetworkError(new Error('fuel-core: bad request'))).toBe(
      false,
    );
    expect(
      isTransientNetworkError(new SyntaxError('Unexpected token < in JSON')),
    ).toBe(false);
  });

  it('does not match a TypeError with an unrelated cause code', () => {
    const err = new TypeError('terminated');
    (err as { cause?: unknown }).cause = { code: 'ENOENT' };
    expect(isTransientNetworkError(err)).toBe(false);
  });

  it('does not match non-Error values', () => {
    expect(isTransientNetworkError('boom')).toBe(false);
    expect(isTransientNetworkError(undefined)).toBe(false);
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
