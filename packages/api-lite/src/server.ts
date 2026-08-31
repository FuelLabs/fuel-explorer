import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import type { CosmosPoller } from './cosmos/CosmosPoller';
import type { AppContext } from './graphql/context';
import { buildCharts } from './graphql/resolvers/charts';
import { buildSchema } from './graphql/schema';
import type { Indexer } from './index/Indexer';
import { type RestRouterDeps, handleRestRequest } from './rest/router';

// `indexer`, `blockSource` and `cosmos` are optional so existing
// AppContext-only callers (tests) keep compiling; main.ts passes all three so
// /health can report them.
export type AppDeps = AppContext & {
  indexer?: Pick<Indexer, 'backfillPaused'>;
  blockSource?: 's3' | 'rpc';
  cosmos?: Pick<CosmosPoller, 'cursor' | 'tip'>;
  l1?: { enabled: boolean; cursors: () => Record<string, number> };
  staking?: RestRouterDeps['staking'];
  apy?: RestRouterDeps['apy'];
  bridge?: RestRouterDeps['bridge'];
};

export function createApp(ctx: AppDeps) {
  const yoga = createYoga<AppContext>({
    schema: buildSchema(),
    graphqlEndpoint: '/graphql',
    batching: true,
    // yoga's default maskError only touches errors that aren't already an
    // intentional GraphQLError (pageSize's validation error, "Either id or
    // height must be provided", etc. pass through unchanged in both modes).
    // In production it replaces everything else (AWS SDK messages naming the
    // S3 bucket, sqlite errors, providerDocPath's absolute container paths)
    // with a generic message and logs the original server-side; outside
    // production it's off entirely so the real error is visible while developing.
    maskedErrors: process.env.NODE_ENV === 'production',
    context: () => ctx,
  });
  const health = () => ({
    ok: ctx.tip.servedTip > 0,
    fuelCore: ctx.tip.fuelCoreUp ? 'up' : 'down',
    fuelCoreTip: ctx.tip.fuelCoreTip,
    servedTip: ctx.tip.servedTip,
    lag: ctx.tip.fuelCoreTip - ctx.tip.servedTip,
    backfillPaused: ctx.indexer?.backfillPaused ?? false,
    blockSource: ctx.blockSource ?? 's3',
    index: { ...ctx.index.range(), gaps: ctx.index.gaps() },
    indexBytes: ctx.index.fileBytes(),
    hot: ctx.hot.counts(),
    rss: process.memoryUsage().rss,
    cosmos: ctx.cosmos
      ? { cursor: ctx.cosmos.cursor, tip: ctx.cosmos.tip }
      : undefined,
    l1: ctx.l1
      ? { enabled: ctx.l1.enabled, cursors: ctx.l1.cursors() }
      : undefined,
  });
  const server = createServer((req, res) => {
    if (req.url === '/health') {
      const h = health();
      res.writeHead(h.ok ? 200 : 503, { 'content-type': 'application/json' });
      res.end(JSON.stringify(h));
      return;
    }
    // router.ts catches its own synchronous/async errors and always resolves
    // (never rejects); this .catch() is defense in depth so a future
    // uncaught path there becomes a logged 500 instead of an unhandled
    // rejection that could crash the process.
    void handleRestRequest(req, res, {
      staking: ctx.staking ?? null,
      apy: ctx.apy ?? null,
      bridge: ctx.bridge ?? null,
      charts: { build: () => buildCharts(ctx) },
    })
      .then((handled) => {
        if (!handled) return yoga(req, res);
      })
      .catch((err) => {
        console.error('handleRestRequest failed', err);
        if (!res.headersSent) {
          res.writeHead(500, { 'content-type': 'application/json' });
        }
        res.end(JSON.stringify({ message: 'internal error' }));
      });
  });
  return { yoga, server, health };
}
