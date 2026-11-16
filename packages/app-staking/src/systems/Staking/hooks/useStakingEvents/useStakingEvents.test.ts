/// <reference types="jest" />

import { QueryClient } from '@tanstack/react-query';
import { walkStakingEvents } from './useStakingEvents';

const mockGet = jest.fn();

jest.mock('~staking/systems/Core/utils/api', () => ({
  api: { get: (...args: unknown[]) => mockGet(...args) },
}));

jest.mock('app-commons', () => ({
  FUEL_INDEXER_API: 'https://indexer.test',
}));

const KEY = ['staking-events', 'all', '0xabc'];

const page = (ids: number[], hasPreviousPage: boolean, endCursor = 0) => ({
  nodes: ids.map((id) => ({ id: String(id) })),
  pageInfo: { hasPreviousPage, endCursor },
});

const deferred = () => {
  let resolve: (value: unknown) => void = () => undefined;
  const promise = new Promise((res) => {
    resolve = res;
  });
  return { promise, resolve };
};

const run = (queryClient: QueryClient) =>
  walkStakingEvents({
    address: '0xabc',
    queryClient,
    queryKey: KEY,
  });

describe('walkStakingEvents', () => {
  beforeEach(() => mockGet.mockReset());

  it('chains pages on endCursor and stops when history ends', async () => {
    mockGet
      .mockResolvedValueOnce(page([1, 2], true, 20))
      .mockResolvedValueOnce(page([3], false));
    const client = new QueryClient();

    const result = await run(client);

    expect(result.nodes.map((n) => n.id)).toEqual(['1', '2', '3']);
    expect(result.truncated).toBe(false);
    expect(result.hasNextPage).toBe(false);
    expect(mockGet.mock.calls[1][0]).toContain('before=20');
    expect(client.getQueryData(KEY)).toEqual(result);
  });

  it('writes the first page to the cache before the next page returns', async () => {
    const client = new QueryClient();
    const gate = deferred();
    mockGet
      .mockResolvedValueOnce(page([1], true, 5))
      .mockReturnValueOnce(gate.promise);

    const walk = run(client);
    await Promise.resolve();
    await Promise.resolve();

    const partial = client.getQueryData<{
      nodes: unknown[];
      hasNextPage: boolean;
    }>(KEY);
    expect(partial?.nodes).toHaveLength(1);
    expect(partial?.hasNextPage).toBe(true);

    gate.resolve(page([2], false));
    await walk;
  });

  it('sets truncated when the page cap is hit with history left', async () => {
    mockGet.mockImplementation(async () => page([1], true, 1));
    const result = await run(new QueryClient());

    expect(mockGet).toHaveBeenCalledTimes(20);
    expect(result.truncated).toBe(true);
    expect(result.hasNextPage).toBe(false);
  });

  it('keeps pages already cached when a later page fails', async () => {
    mockGet
      .mockResolvedValueOnce(page([1, 2], true, 9))
      .mockRejectedValueOnce(new Error('indexer down'));
    const client = new QueryClient();

    await expect(run(client)).rejects.toThrow('indexer down');

    const kept = client.getQueryData<{ nodes: unknown[] }>(KEY);
    expect(kept?.nodes).toHaveLength(2);
  });

  it('keeps the cached list during a refetch until the walk catches up', async () => {
    const client = new QueryClient();
    client.setQueryData(KEY, {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      truncated: false,
      hasNextPage: false,
    });
    const gate = deferred();
    mockGet
      .mockResolvedValueOnce(page([1], true, 5))
      .mockReturnValueOnce(gate.promise);

    const walk = run(client);
    await Promise.resolve();
    await Promise.resolve();

    const during = client.getQueryData<{ nodes: unknown[] }>(KEY);
    expect(during?.nodes).toHaveLength(3);

    gate.resolve(page([2, 3, 4], false));
    const result = await walk;
    expect(result.nodes).toHaveLength(4);
    expect(client.getQueryData<{ nodes: unknown[] }>(KEY)?.nodes).toHaveLength(
      4,
    );
  });
});
