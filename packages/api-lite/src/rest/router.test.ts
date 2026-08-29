import type { IncomingMessage, ServerResponse } from 'node:http';
import { type RestRouterDeps, handleRestRequest } from './router';

function fakeReq(method: string, url: string): IncomingMessage {
  return { method, url } as IncomingMessage;
}

function fakeRes() {
  const calls: { status?: number; headers?: unknown; body?: string } = {};
  const res = {
    writeHead: (status: number, headers: unknown) => {
      calls.status = status;
      calls.headers = headers;
      return res;
    },
    end: (body?: string) => {
      calls.body = body;
    },
  } as unknown as ServerResponse;
  return { res, calls };
}

function disabledDeps(): RestRouterDeps {
  return { apy: null, staking: null, bridge: null };
}

describe('handleRestRequest', () => {
  it('falls through (returns false) for non-GET requests', async () => {
    const { res } = fakeRes();
    const handled = await handleRestRequest(
      fakeReq('POST', '/staking/apy'),
      res,
      disabledDeps(),
    );
    expect(handled).toBe(false);
  });

  it('falls through for paths outside /staking/', async () => {
    const { res } = fakeRes();
    const handled = await handleRestRequest(
      fakeReq('GET', '/graphql'),
      res,
      disabledDeps(),
    );
    expect(handled).toBe(false);
  });

  it('answers /staking/apy even when the L1 poller (staking/bridge) is disabled', async () => {
    const { res, calls } = fakeRes();
    const deps: RestRouterDeps = {
      ...disabledDeps(),
      apy: { amount: jest.fn().mockResolvedValue('7') },
    };
    const handled = await handleRestRequest(
      fakeReq('GET', '/staking/apy'),
      res,
      deps,
    );
    expect(handled).toBe(true);
    expect(calls.status).toBe(200);
    expect(JSON.parse(calls.body as string)).toEqual({ amount: '7' });
  });

  it('returns 503 for /staking/apy when apy itself is unavailable', async () => {
    const { res, calls } = fakeRes();
    const handled = await handleRestRequest(
      fakeReq('GET', '/staking/apy'),
      res,
      disabledDeps(),
    );
    expect(handled).toBe(true);
    expect(calls.status).toBe(503);
  });

  it('responds 400 (never rejects) for a malformed request target', async () => {
    const { res, calls } = fakeRes();
    await expect(
      handleRestRequest(fakeReq('GET', '//['), res, disabledDeps()),
    ).resolves.toBe(true);
    expect(calls.status).toBe(400);
  });

  it('returns 503 for a staking route when the L1 poller is disabled', async () => {
    const { res, calls } = fakeRes();
    const handled = await handleRestRequest(
      fakeReq('GET', '/staking/events?address=0xabc'),
      res,
      disabledDeps(),
    );
    expect(handled).toBe(true);
    expect(calls.status).toBe(503);
    expect(JSON.parse(calls.body as string)).toEqual({
      error: 'l1 ingestion disabled',
    });
  });

  function enabledDeps(overrides: Partial<RestRouterDeps['staking']> = {}) {
    return {
      apy: { amount: jest.fn().mockResolvedValue('42') },
      staking: {
        enabled: true,
        store: {
          getEvents: jest.fn().mockResolvedValue({ nodes: [], edges: [] }),
          getEvent: jest.fn().mockResolvedValue({ id: 1 }),
        },
        finalization: {
          timeToFinalizeStrict: jest.fn().mockResolvedValue(60),
          unbondingTimeSeconds: jest.fn().mockResolvedValue(1_814_400),
        },
        ...overrides,
      },
      bridge: null,
    } as unknown as RestRouterDeps;
  }

  it('GET /staking/apy returns { amount }', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps();
    await handleRestRequest(fakeReq('GET', '/staking/apy'), res, deps);
    expect(calls.status).toBe(200);
    expect(JSON.parse(calls.body as string)).toEqual({ amount: '42' });
  });

  it('GET /staking/events forwards address/after/before/last to the store', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps();
    await handleRestRequest(
      fakeReq('GET', '/staking/events?address=0xabc&after=5&last=20'),
      res,
      deps,
    );
    expect(calls.status).toBe(200);
    const getEvents = deps.staking?.store.getEvents as jest.Mock;
    expect(getEvents).toHaveBeenCalledTimes(1);
    expect(getEvents.mock.calls[0][0]).toBe('0xabc');
    expect(getEvents.mock.calls[0][1]).toMatchObject({
      cursor: 5,
      direction: 'after',
      last: 20,
    });
  });

  it('GET /staking/events returns 400 with the message when last exceeds the page cap', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps();
    await handleRestRequest(
      fakeReq('GET', '/staking/events?address=0xabc&last=51'),
      res,
      deps,
    );
    expect(calls.status).toBe(400);
    expect(JSON.parse(calls.body as string)).toEqual({
      message: 'Maximum page size allowed is 50',
    });
  });

  it('GET /staking/events/:eventId calls store.getEvent with a numeric id', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps();
    await handleRestRequest(fakeReq('GET', '/staking/events/42'), res, deps);
    expect(calls.status).toBe(200);
    expect(deps.staking?.store.getEvent).toHaveBeenCalledWith(42);
  });

  it('GET /staking/events/:eventId returns 400 for a non-numeric id', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps();
    await handleRestRequest(
      fakeReq('GET', '/staking/events/not-a-number'),
      res,
      deps,
    );
    expect(calls.status).toBe(400);
    expect(JSON.parse(calls.body as string)).toEqual({
      message: 'Invalid event id',
    });
  });

  it('GET /staking/events/:eventId returns 400 when the store throws "Event not found"', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps({
      store: {
        getEvents: jest.fn(),
        getEvent: jest.fn().mockRejectedValue(new Error('Event not found')),
      },
    } as never);
    await handleRestRequest(fakeReq('GET', '/staking/events/9'), res, deps);
    expect(calls.status).toBe(400);
    expect(JSON.parse(calls.body as string)).toEqual({
      message: 'Event not found',
    });
  });

  it('GET /staking/finalization-period/withdraw sums minutes*60 + commit + sync constants', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps();
    await handleRestRequest(
      fakeReq('GET', '/staking/finalization-period/withdraw'),
      res,
      deps,
    );
    expect(calls.status).toBe(200);
    // 60 min * 60 + 10h commit (36000) + 30min sync (1800)
    expect(JSON.parse(calls.body as string)).toEqual({ seconds: 41400 });
  });

  it('GET /staking/finalization-period/withdraw returns { seconds: null } when unavailable', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps({
      finalization: {
        timeToFinalizeStrict: jest.fn().mockResolvedValue(null),
        unbondingTimeSeconds: jest.fn(),
      },
    } as never);
    await handleRestRequest(
      fakeReq('GET', '/staking/finalization-period/withdraw'),
      res,
      deps,
    );
    expect(calls.status).toBe(200);
    expect(JSON.parse(calls.body as string)).toEqual({ seconds: null });
  });

  it('GET /staking/finalization-period/withdraw returns 500 { seconds: null } on throw', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps({
      finalization: {
        timeToFinalizeStrict: jest.fn().mockRejectedValue(new Error('boom')),
        unbondingTimeSeconds: jest.fn(),
      },
    } as never);
    await handleRestRequest(
      fakeReq('GET', '/staking/finalization-period/withdraw'),
      res,
      deps,
    );
    expect(calls.status).toBe(500);
    expect(JSON.parse(calls.body as string)).toEqual({ seconds: null });
  });

  it('GET /staking/finalization-period/undelegate adds the sequencer sync constant', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps();
    await handleRestRequest(
      fakeReq('GET', '/staking/finalization-period/undelegate'),
      res,
      deps,
    );
    expect(calls.status).toBe(200);
    expect(JSON.parse(calls.body as string)).toEqual({ seconds: 1_816_200 });
  });

  it('returns 404 json for an unknown /staking/* path', async () => {
    const { res, calls } = fakeRes();
    const deps = enabledDeps();
    await handleRestRequest(fakeReq('GET', '/staking/nope'), res, deps);
    expect(calls.status).toBe(404);
  });

  function bridgeEnabledDeps(
    overrides: Partial<NonNullable<RestRouterDeps['bridge']>['store']> = {},
  ): RestRouterDeps {
    return {
      staking: null,
      bridge: {
        enabled: true,
        store: {
          queryLogsForRecipient: jest.fn().mockReturnValue([]),
          queryBlockHashes: jest.fn().mockReturnValue([]),
          queryMessageRelayedTxHash: jest.fn().mockReturnValue([]),
          ...overrides,
        },
      },
    } as unknown as RestRouterDeps;
  }

  it('returns 503 for a bridge route when the L1 poller is disabled', async () => {
    const { res, calls } = fakeRes();
    const handled = await handleRestRequest(
      fakeReq('GET', '/bridge/deposit/logs?address=0xabc'),
      res,
      disabledDeps(),
    );
    expect(handled).toBe(true);
    expect(calls.status).toBe(503);
    expect(JSON.parse(calls.body as string)).toEqual({
      error: 'l1 ingestion disabled',
    });
  });

  it('GET /bridge/deposit/logs forwards address/recipient/predicate to the store', async () => {
    const { res, calls } = fakeRes();
    const deps = bridgeEnabledDeps({
      queryLogsForRecipient: jest
        .fn()
        .mockReturnValue([{ recipient: '0xr', transactionHash: '0xtx' }]),
    });
    await handleRestRequest(
      fakeReq(
        'GET',
        '/bridge/deposit/logs?address=0xportal&recipient=0xr&predicate=0xp',
      ),
      res,
      deps,
    );
    expect(calls.status).toBe(200);
    expect(deps.bridge?.store.queryLogsForRecipient).toHaveBeenCalledWith(
      '0xportal',
      '0xr',
      '0xp',
    );
    expect(JSON.parse(calls.body as string)).toEqual([
      { recipient: '0xr', transactionHash: '0xtx' },
    ]);
  });

  it('GET /bridge/block/hashes forwards address/from_block to the store', async () => {
    const { res, calls } = fakeRes();
    const deps = bridgeEnabledDeps({
      queryBlockHashes: jest
        .fn()
        .mockReturnValue([{ fuelBlockHash: '0xf', ethBlockHash: '0xe' }]),
    });
    await handleRestRequest(
      fakeReq(
        'GET',
        '/bridge/block/hashes?address=0xchainstate&from_block=100',
      ),
      res,
      deps,
    );
    expect(calls.status).toBe(200);
    expect(deps.bridge?.store.queryBlockHashes).toHaveBeenCalledWith(
      '0xchainstate',
      100,
    );
    expect(JSON.parse(calls.body as string)).toEqual([
      { fuelBlockHash: '0xf', ethBlockHash: '0xe' },
    ]);
  });

  it('GET /bridge/message/relayed/hash forwards address/message_id to the store', async () => {
    const { res, calls } = fakeRes();
    const deps = bridgeEnabledDeps({
      queryMessageRelayedTxHash: jest
        .fn()
        .mockReturnValue([{ transactionHash: '0xtx' }]),
    });
    await handleRestRequest(
      fakeReq(
        'GET',
        '/bridge/message/relayed/hash?address=0xportal&message_id=0xmsg',
      ),
      res,
      deps,
    );
    expect(calls.status).toBe(200);
    expect(deps.bridge?.store.queryMessageRelayedTxHash).toHaveBeenCalledWith(
      '0xportal',
      '0xmsg',
    );
    expect(JSON.parse(calls.body as string)).toEqual([
      { transactionHash: '0xtx' },
    ]);
  });

  it('returns 404 { error: "not available" } for /bridge/events', async () => {
    const { res, calls } = fakeRes();
    const deps = bridgeEnabledDeps();
    await handleRestRequest(
      fakeReq('GET', '/bridge/events?address=0xa'),
      res,
      deps,
    );
    expect(calls.status).toBe(404);
    expect(JSON.parse(calls.body as string)).toEqual({
      error: 'not available',
    });
  });

  it('returns 404 { error: "not available" } for /bridge/:eventType/:eventId', async () => {
    const { res, calls } = fakeRes();
    const deps = bridgeEnabledDeps();
    await handleRestRequest(fakeReq('GET', '/bridge/deposit/42'), res, deps);
    expect(calls.status).toBe(404);
    expect(JSON.parse(calls.body as string)).toEqual({
      error: 'not available',
    });
  });
});
