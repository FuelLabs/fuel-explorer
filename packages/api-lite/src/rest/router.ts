import type { IncomingMessage, ServerResponse } from 'node:http';
import type { BridgeStore } from '../bridge/BridgeStore';
import { ValidationError } from '../errors';
import { PaginatedParams } from '../staking/PaginatedParams';
import type { StakingStore } from '../staking/StakingStore';
import type { StakingAPY } from '../staking/apy';
import {
  type FinalizationPeriods,
  TIME_TO_COMMIT_SECONDS,
  TIME_TO_SEQUENCER_INDEXER_SYNC_SECONDS,
} from '../staking/finalization';

export type StakingRouteDeps = {
  enabled: boolean;
  store: Pick<StakingStore, 'getEvents' | 'getEvent'>;
  finalization: Pick<
    FinalizationPeriods,
    'timeToFinalizeStrict' | 'unbondingTimeSeconds'
  >;
};

export type BridgeRouteDeps = {
  enabled: boolean;
  store: Pick<
    BridgeStore,
    'queryLogsForRecipient' | 'queryBlockHashes' | 'queryMessageRelayedTxHash'
  >;
};

// GET /charts needs no L1 ingestion (same reasoning as `apy` below), so it's
// always present rather than nullable.
export type ChartsRouteDeps = {
  build: () => Promise<{ statistics: unknown; tps: unknown }>;
};

export type RestRouterDeps = {
  // Unlike `staking` (events/event-by-id/finalization-period), APY needs no
  // L1 ingestion — only the sequencer's cosmos REST API — so it's kept
  // independent of ETH_RPC_URL instead of living under StakingRouteDeps.
  apy: Pick<StakingAPY, 'amount'> | null;
  staking: StakingRouteDeps | null;
  bridge: BridgeRouteDeps | null;
  charts: ChartsRouteDeps;
};

function sendJson(
  res: ServerResponse,
  status: number,
  body: unknown,
  extraHeaders?: Record<string, string>,
): void {
  res.writeHead(status, {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    ...extraHeaders,
  });
  res.end(JSON.stringify(body));
}

// Shared catch-block policy for every REST route below: a ValidationError
// (thrown from an input-validation site -- address parsing, event-id
// parsing, PaginatedParams' page-size cap) means the caller sent something
// wrong, so its message is safe to return as a 400. Anything else -- a
// cosmos/L1 RPC call throwing, a downstream store hitting a sqlite error --
// is not the caller's fault, so it gets a generic 502 instead of a 400 that
// would wrongly imply a bad request, plus a server-side log since the detail
// isn't returned to the client.
function sendError(res: ServerResponse, err: unknown, context: string): void {
  if (err instanceof ValidationError) {
    sendJson(res, 400, { message: err.message });
    return;
  }
  console.error(`${context} failed`, err);
  sendJson(res, 502, { error: 'upstream unavailable' });
}

const EVENT_PATH_RE = /^\/staking\/events\/([^/]+)$/;

// Wired into server.ts ahead of the graphql-yoga handler. Returns true when
// it handled the request, so the caller knows whether to fall through to
// yoga.
export async function handleRestRequest(
  req: IncomingMessage,
  res: ServerResponse,
  deps: RestRouterDeps,
): Promise<boolean> {
  if (req.method !== 'GET') return false;

  let url: URL;
  let path: string;
  try {
    // A malformed request-target (e.g. `//[`) throws synchronously from the
    // URL constructor; without this try/catch it becomes an unhandled
    // rejection through server.ts's `void handleRestRequest(...).then(...)`.
    url = new URL(req.url ?? '/', 'http://internal');
    path = url.pathname;
  } catch {
    sendJson(res, 400, { message: 'invalid request target' });
    return true;
  }

  if (path.startsWith('/bridge/'))
    return handleBridgeRequest(res, path, url, deps);

  if (path === '/charts') {
    try {
      const body = await deps.charts.build();
      // 60s matches nginx's `proxy_cache_valid 200 60s` on `/api/charts`, so
      // the CDN/browser and origin caches expire together.
      sendJson(res, 200, body, { 'cache-control': 'public, max-age=60' });
    } catch (err) {
      console.error('buildCharts failed', err);
      sendJson(res, 500, { error: 'charts unavailable' });
    }
    return true;
  }

  if (path === '/staking/apy') {
    if (!deps.apy) {
      sendJson(res, 503, { error: 'l1 ingestion disabled' });
      return true;
    }
    try {
      const amount = await deps.apy.amount();
      sendJson(res, 200, { amount });
    } catch (err) {
      sendError(res, err, 'staking/apy');
    }
    return true;
  }

  if (!path.startsWith('/staking/')) return false;

  if (!deps.staking) {
    sendJson(res, 503, { error: 'l1 ingestion disabled' });
    return true;
  }
  const { staking } = deps;

  try {
    if (path === '/staking/events') {
      const address = url.searchParams.get('address') ?? '';
      const paginatedParams = new PaginatedParams({
        after: url.searchParams.get('after') ?? undefined,
        before: url.searchParams.get('before') ?? undefined,
        last: url.searchParams.get('last') ?? undefined,
      });
      const result = await staking.store.getEvents(address, paginatedParams);
      sendJson(res, 200, result);
      return true;
    }

    // No inner try/catch here: a throw (e.g. the L1 RPC call inside
    // timeToFinalizeStrict failing) falls through to the shared catch below,
    // which reports a 502 { error } body -- distinct from the `seconds:
    // null` 200 body above, which means "no data yet" rather than "the call
    // failed".
    if (path === '/staking/finalization-period/withdraw') {
      const minutes = await staking.finalization.timeToFinalizeStrict();
      if (minutes == null) {
        sendJson(res, 200, { seconds: null });
        return true;
      }
      const totalSeconds =
        minutes * 60 +
        TIME_TO_COMMIT_SECONDS +
        TIME_TO_SEQUENCER_INDEXER_SYNC_SECONDS;
      sendJson(res, 200, { seconds: totalSeconds });
      return true;
    }

    if (path === '/staking/finalization-period/undelegate') {
      const seconds = await staking.finalization.unbondingTimeSeconds();
      if (seconds == null) {
        sendJson(res, 200, { seconds: null });
        return true;
      }
      sendJson(res, 200, {
        seconds: seconds + TIME_TO_SEQUENCER_INDEXER_SYNC_SECONDS,
      });
      return true;
    }

    const eventMatch = path.match(EVENT_PATH_RE);
    if (eventMatch) {
      const eventId = Number(eventMatch[1]);
      if (!Number.isInteger(eventId)) {
        throw new ValidationError('Invalid event id');
      }
      try {
        const result = await staking.store.getEvent(eventId);
        sendJson(res, 200, result);
      } catch (err) {
        if (err instanceof Error && err.message === 'Event not found') {
          sendJson(res, 404, { error: 'Event not found' });
        } else {
          throw err;
        }
      }
      return true;
    }
  } catch (err) {
    sendError(res, err, 'staking');
    return true;
  }

  sendJson(res, 404, { message: 'not found' });
  return true;
}

// /bridge/events and /bridge/:eventType/:eventId are not implemented; both,
// and any other unmatched /bridge/ path, fall through to the 404 at the end.
async function handleBridgeRequest(
  res: ServerResponse,
  path: string,
  url: URL,
  deps: RestRouterDeps,
): Promise<boolean> {
  if (!deps.bridge) {
    sendJson(res, 503, { error: 'l1 ingestion disabled' });
    return true;
  }
  const { bridge } = deps;

  try {
    if (path === '/bridge/deposit/logs') {
      const address = url.searchParams.get('address') ?? '';
      const recipient = url.searchParams.get('recipient') ?? '';
      const predicate = url.searchParams.get('predicate') ?? '';
      const result = bridge.store.queryLogsForRecipient(
        address,
        recipient,
        predicate,
      );
      sendJson(res, 200, result);
      return true;
    }

    if (path === '/bridge/block/hashes') {
      const address = url.searchParams.get('address') ?? '';
      const fromBlock = Number(url.searchParams.get('from_block'));
      const result = bridge.store.queryBlockHashes(address, fromBlock);
      sendJson(res, 200, result);
      return true;
    }

    if (path === '/bridge/message/relayed/hash') {
      const address = url.searchParams.get('address') ?? '';
      const messageId = url.searchParams.get('message_id') ?? '';
      const result = bridge.store.queryMessageRelayedTxHash(address, messageId);
      sendJson(res, 200, result);
      return true;
    }
  } catch (err) {
    sendError(res, err, 'bridge');
    return true;
  }

  sendJson(res, 404, { error: 'not available' });
  return true;
}
