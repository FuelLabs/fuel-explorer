import { FuelCoreClient } from './FuelCoreClient';

const fakeBlock = { __typename: 'Block', height: '42', id: '0xabc' };

function fakeFetch(handler: (body: any) => any) {
  return (async (_url: string, init: any) => {
    const body = JSON.parse(init.body);
    return { ok: true, json: async () => ({ data: handler(body) }) };
  }) as unknown as typeof fetch;
}

describe('FuelCoreClient', () => {
  it('latestHeight', async () => {
    const c = new FuelCoreClient(
      'http://x',
      fakeFetch(() => ({ blocks: { nodes: [{ header: { height: '123' } }] } })),
    );
    expect(await c.latestHeight()).toBe(123);
  });
  it('heightForTx success and failure statuses', async () => {
    const c = new FuelCoreClient(
      'http://x',
      fakeFetch(() => ({
        transaction: {
          status: { __typename: 'FailureStatus', block: { height: '77' } },
        },
      })),
    );
    expect(await c.heightForTx('0xab')).toBe(77);
    const none = new FuelCoreClient(
      'http://x',
      fakeFetch(() => ({ transaction: null })),
    );
    expect(await none.heightForTx('0xab')).toBeNull();
  });
  it('heightForBlock', async () => {
    const c = new FuelCoreClient(
      'http://x',
      fakeFetch(() => ({ block: { height: '5' } })),
    );
    expect(await c.heightForBlock('0xab')).toBe(5);
  });
  it('chainParams maps consensus parameters', async () => {
    const c = new FuelCoreClient(
      'http://x',
      fakeFetch(() => ({
        chain: {
          consensusParameters: {
            chainId: '9889',
            baseAssetId: '0x00',
            feeParams: { gasPriceFactor: '92', gasPerByte: '63' },
            txParams: { maxGasPerTx: '30000000' },
            gasCosts: { ecr1: '3000' },
          },
        },
      })),
    );
    const p = await c.chainParams();
    expect(p.chainId).toBe(9889);
    expect(p.fee.gasPriceFactor).toBe('92');
    expect(p.fee.gasCosts).toEqual({ ecr1: '3000' });
  });
  it('txsByOwner maps edges (with per-item cursor) and drops items without height', async () => {
    const c = new FuelCoreClient(
      'http://x',
      fakeFetch(() => ({
        transactionsByOwner: {
          pageInfo: {
            startCursor: 'c1',
            endCursor: 'c2',
            hasNextPage: true,
            hasPreviousPage: false,
          },
          edges: [
            {
              cursor: 'c1',
              node: {
                id: '0x01',
                status: {
                  __typename: 'SuccessStatus',
                  block: { height: '10' },
                },
              },
            },
            {
              cursor: 'c2',
              node: { id: '0x02', status: { __typename: 'SubmittedStatus' } },
            },
          ],
        },
      })),
    );
    expect(await c.txsByOwner('0xaa', { first: 10 })).toEqual({
      items: [{ id: '0x01', height: 10, cursor: 'c1' }],
      hasNextPage: true,
      hasPreviousPage: false,
    });
  });
  it('txsByOwner sends first/after for forward paging and last/before for backward paging', async () => {
    let seen: any;
    const c = new FuelCoreClient(
      'http://x',
      fakeFetch((body) => {
        seen = body.variables;
        return {
          transactionsByOwner: {
            pageInfo: {
              startCursor: null,
              endCursor: null,
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
        };
      }),
    );
    await c.txsByOwner('0xaa', { first: 5, after: 'x' });
    expect(seen).toEqual({ owner: '0xaa', first: 5, after: 'x' });
    await c.txsByOwner('0xaa', { first: 5 });
    expect(seen).toEqual({ owner: '0xaa', first: 5 });
    await c.txsByOwner('0xaa', { last: 5, before: 'y' });
    expect(seen).toEqual({ owner: '0xaa', last: 5, before: 'y' });
  });
  it('throws on GraphQL errors', async () => {
    const f = (async () => ({
      ok: true,
      json: async () => ({ errors: [{ message: 'boom' }] }),
    })) as unknown as typeof fetch;
    await expect(
      new FuelCoreClient('http://x', f).latestHeight(),
    ).rejects.toThrow(/boom/);
  });

  it('sends every request with a 15s AbortSignal timeout, so a hung fuel-core cannot deadlock the caller', async () => {
    let seenSignal: AbortSignal | undefined;
    const f = (async (_url: string, init: any) => {
      seenSignal = init.signal;
      return {
        ok: true,
        json: async () => ({ data: { blocks: { nodes: [] } } }),
      };
    }) as unknown as typeof fetch;
    await new FuelCoreClient('http://x', f).latestHeight();
    expect(seenSignal).toBeInstanceOf(AbortSignal);
    expect(seenSignal?.aborted).toBe(false);
  });

  describe('blockJson', () => {
    it('runs the BlockItems fragment with the requested height and returns data.block', async () => {
      let seenQuery = '';
      let seenVariables: any;
      const c = new FuelCoreClient(
        'http://x',
        fakeFetch((body) => {
          seenQuery = body.query;
          seenVariables = body.variables;
          return { block: fakeBlock };
        }),
      );
      const result = await c.blockJson(42);
      expect(result).toEqual(fakeBlock);
      expect(seenQuery).toContain('fragment BlockItems on Block');
      expect(seenQuery).toContain(
        'query($h: U32!) { block(height: $h) { ...BlockItems } }',
      );
      expect(seenVariables).toEqual({ h: '42' });
    });

    it('returns null when fuel-core has no block at that height', async () => {
      const c = new FuelCoreClient(
        'http://x',
        fakeFetch(() => ({ block: null })),
      );
      expect(await c.blockJson(999999)).toBeNull();
    });
  });

  describe('blockSignatures', () => {
    it('builds one aliased query per height and maps signatures, dropping non-PoA/missing entries', async () => {
      let seenQuery = '';
      const c = new FuelCoreClient(
        'http://x',
        fakeFetch((body) => {
          seenQuery = body.query;
          return {
            b0: {
              consensus: { __typename: 'PoAConsensus', signature: '0xaa' },
            },
            b1: { consensus: { __typename: 'Genesis' } },
            b2: null,
          };
        }),
      );
      const result = await c.blockSignatures([10, 11, 12]);
      expect(seenQuery).toContain(
        'b0: block(height: "10") { consensus { __typename ... on PoAConsensus { signature } } }',
      );
      expect(seenQuery).toContain('b1: block(height: "11")');
      expect(seenQuery).toContain('b2: block(height: "12")');
      expect(result).toEqual(new Map([[10, '0xaa']]));
    });

    it('chunks at 20 heights per request', async () => {
      const calls: number[][] = [];
      const c = new FuelCoreClient(
        'http://x',
        fakeFetch((body) => {
          const heights = [
            ...(body.query as string).matchAll(/height: "(\d+)"/g),
          ].map((m) => Number(m[1]));
          calls.push(heights);
          const out: Record<string, unknown> = {};
          heights.forEach((h, i) => {
            out[`b${i}`] = {
              consensus: { __typename: 'PoAConsensus', signature: `0x${h}` },
            };
          });
          return out;
        }),
      );
      const heights = Array.from({ length: 25 }, (_, i) => i);
      const result = await c.blockSignatures(heights);
      expect(calls).toHaveLength(2);
      expect(calls[0]).toHaveLength(20);
      expect(calls[1]).toHaveLength(5);
      expect(result.size).toBe(25);
      expect(result.get(24)).toBe('0x24');
    });

    it('returns an empty map and logs once on request failure, without throwing', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const f = (async () => {
        throw new Error('network down');
      }) as unknown as typeof fetch;
      const c = new FuelCoreClient('http://x', f);
      await expect(c.blockSignatures([1, 2])).resolves.toEqual(new Map());
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });
});
