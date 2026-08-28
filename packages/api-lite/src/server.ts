import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import type { AppContext } from './graphql/context';
import { buildSchema } from './graphql/schema';
import type { Indexer } from './index/Indexer';

// `indexer` and `blockSource` are optional so existing AppContext-only callers
// (tests) keep compiling; main.ts passes both so /health can report them.
export type AppDeps = AppContext & {
  indexer?: Pick<Indexer, 'backfillPaused'>;
  blockSource?: 's3' | 'rpc';
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
    index: ctx.index.range(),
    indexBytes: ctx.index.fileBytes(),
    rss: process.memoryUsage().rss,
  });
  const server = createServer((req, res) => {
    if (req.url === '/health') {
      const h = health();
      res.writeHead(h.ok ? 200 : 503, { 'content-type': 'application/json' });
      res.end(JSON.stringify(h));
      return;
    }
    return yoga(req, res);
  });
  return { yoga, server, health };
}
