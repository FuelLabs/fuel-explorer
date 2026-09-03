import { readFileSync } from 'node:fs';
import { providerDocPath } from '../../fuelcore/FuelCoreClient';
import type { AppContext } from '../context';
import {
  amountInUsd,
  findExactMatch,
  isImpersonating,
  loadVerifiedAssets,
} from './assetEnrich';

// Caps how many nodes in one balances/contractBalances response can have an
// in-flight fuel-core assetDetails lookup at once, so a page full of unlisted
// assets can't fan out into an unbounded burst of concurrent requests.
const ASSET_DETAILS_CONCURRENCY = 20;

async function mapWithConcurrency<T>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  let next = 0;
  async function worker(): Promise<void> {
    for (;;) {
      const i = next++;
      if (i >= items.length) return;
      await fn(items[i]);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );
}

// Read once at module load (there are only a handful of these documents, and
// they never change at runtime), instead of a synchronous disk read per request.
const docCache = new Map<string, string>();
const doc = (name: string) => {
  let d = docCache.get(name);
  if (d === undefined) {
    d = readFileSync(providerDocPath(name), 'utf8');
    docCache.set(name, d);
  }
  return d;
};

const MAX_PAGE_SIZE = 100;

// Clamps `first`/`last` before forwarding so a caller cannot turn api-lite into
// an amplifier against the shared upstream mainnet node.
function clampPageArgs(args: Record<string, unknown>): Record<string, unknown> {
  const clamped = { ...args };
  if (typeof clamped.first === 'number')
    clamped.first = Math.min(clamped.first, MAX_PAGE_SIZE);
  if (typeof clamped.last === 'number')
    clamped.last = Math.min(clamped.last, MAX_PAGE_SIZE);
  return clamped;
}

function forward(field: string, file: string) {
  const document = doc(file);
  return async (_: unknown, args: Record<string, unknown>, ctx: AppContext) => {
    const data = await ctx.client.query<Record<string, unknown>>(
      document,
      clampPageArgs(args),
    );
    return data[field];
  };
}

async function enrichAssetNodes(container: any, ctx: AppContext) {
  if (!container) return container;
  const targets: any[] = [
    ...(container.nodes ?? []),
    ...(container.edges ?? []).map((e: any) => e?.node).filter(Boolean),
  ];
  if (!targets.length) return container;

  // Both fetched once per response, not per node: the registry list is the
  // same for every node in the page, and re-awaiting ctx.price.usd() per node
  // would serialize the whole loop behind PriceClient's own cache lookups.
  const [verified, usd] = await Promise.all([
    loadVerifiedAssets(),
    ctx.price.usd(),
  ]);

  await mapWithConcurrency(targets, ASSET_DETAILS_CONCURRENCY, async (node) => {
    const match = findExactMatch(verified, ctx.chain.chainId, node.assetId);
    node.name = match?.asset.name ?? null;
    node.symbol = match?.asset.symbol ?? null;
    node.icon = match?.asset.icon ?? null;
    node.decimals = match?.network.decimals ?? null;
    if (match) {
      node.suspicious = false;
    } else {
      // balances/contractBalances don't carry subId, so an unmatched asset
      // needs one fuel-core round trip to check it (cached 60s in
      // FuelCoreClient), bounded to ASSET_DETAILS_CONCURRENCY in flight.
      const details = await ctx.client.assetDetails(node.assetId);
      node.suspicious = isImpersonating(verified, details?.subId ?? null);
    }
    node.amountInUsd = amountInUsd(
      ctx.chain.baseAssetId,
      usd,
      node.assetId,
      node.amount,
      node.decimals,
    );
  });
  return container;
}

function forwardEnriched(field: string, file: string) {
  const document = doc(file);
  return async (_: unknown, args: Record<string, unknown>, ctx: AppContext) => {
    const data = await ctx.client.query<Record<string, unknown>>(
      document,
      clampPageArgs(args),
    );
    return enrichAssetNodes(data[field], ctx);
  };
}

export const passthroughResolvers = {
  Query: {
    balances: forwardEnriched('balances', 'balances'),
    balance: forward('balance', 'balance'),
    coins: forward('coins', 'coins'),
    contract: forward('contract', 'contract'),
    contractBalances: forwardEnriched('contractBalances', 'contractBalances'),
    chain: async (_: unknown, __: unknown, ctx: AppContext) =>
      ctx.client.rawChain(),
    nodeInfo: forward('nodeInfo', 'nodeInfo'),
  },
};
