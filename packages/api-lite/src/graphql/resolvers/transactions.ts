import { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import type {
  GQLBlock,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
import DataCache from '~/infra/cache/DataCache';
import { convertToUsd } from '~/infra/dao/utils';
import { parseTxCursor, txCursor } from '../../index/Index';
import type { AppContext } from '../context';
import {
  type PageArgs,
  connection,
  emptyConnection,
  pageSize,
} from '../pagination';
import { resolveHeight } from './blocks';

const FIRST_PAGE_CACHE_TTL_MS = 5_000;
const FC_PAGE_TTL_BASE_MS = 30_000;
const FC_PAGE_TTL_CAP_MS = 3_600_000;
// Capped position/count for a single account, mirroring the cap
// countForAccount and newerCountForAccount are already called with.
const TX_COUNT_CAP = 1001;
// The base asset is always 9-decimal (ETH); every USD conversion below is fee
// or coin amounts denominated in it.
const BASE_ASSET_DECIMALS = 9;

export type Pricing = { usd: number | null; baseAssetId: string };

function isBaseAsset(
  assetId: string | null | undefined,
  baseAssetId: string,
): boolean {
  return (
    !!assetId &&
    !!baseAssetId &&
    assetId.toLowerCase() === baseAssetId.toLowerCase()
  );
}

// Null only when the price itself is unavailable; a present price always
// produces a formatted amount (including '$0' for a zero/missing input),
// matching convertToUsd's own zero-amount formatting.
function usdAmount(
  amount: string | null | undefined,
  usd: number | null,
): string | null {
  if (!usd) return null;
  return convertToUsd(amount ?? undefined, BASE_ASSET_DECIMALS, usd).formatted;
}

const AMOUNT_ASSET_TYPES = new Set([
  'InputCoin',
  'CoinOutput',
  'ChangeOutput',
  'VariableOutput',
]);

function withAmountInUsd(
  items: unknown[] | null | undefined,
  pricing: Pricing,
): unknown[] | null | undefined {
  if (!items) return items;
  return items.map((raw) => {
    const item = raw as {
      __typename?: string;
      assetId?: string | null;
      amount?: string | null;
    };
    if (!AMOUNT_ASSET_TYPES.has(item.__typename ?? '')) return raw;
    const amountInUsd = isBaseAsset(item.assetId, pricing.baseAssetId)
      ? usdAmount(item.amount, pricing.usd)
      : null;
    return { ...item, amountInUsd };
  });
}

// Matches production's TransactionResolver.transaction(): mintAmountUsd is
// always computed from mintAmount (undefined on a non-mint tx, so it comes
// back as convertToUsd's '$0'), gated only on price availability -- not on
// isMint -- except we additionally require the minted asset to be the base
// asset, since converting a foreign asset's raw amount at the ETH rate would
// be actively wrong rather than merely unavailable.
function mintAmountUsdFor(
  node: {
    isMint?: boolean | null;
    mintAssetId?: string | null;
    mintAmount?: string | null;
  },
  pricing: Pricing,
): string {
  if (!pricing.usd) return '';
  const amount =
    node.isMint && isBaseAsset(node.mintAssetId, pricing.baseAssetId)
      ? node.mintAmount
      : undefined;
  return convertToUsd(amount ?? undefined, BASE_ASSET_DECIMALS, pricing.usd)
    .formatted;
}

function withGasCostsUsd<
  T extends { gasCosts?: { fee?: string | null } | null },
>(node: T, usd: number | null): T {
  if (!node.gasCosts) return node;
  return {
    ...node,
    gasCosts: { ...node.gasCosts, feeInUsd: usdAmount(node.gasCosts.fee, usd) },
  };
}

export function toTxNode(
  tx: GQLTransaction,
  height: number,
  index: number,
  pricing: Pricing = { usd: null, baseAssetId: '' },
) {
  const node = TransactionEntity.createFromGQL(tx, height, index).toGQLNode();
  return {
    ...withGasCostsUsd(node, pricing.usd),
    inputs: withAmountInUsd(node.inputs, pricing),
    outputs: withAmountInUsd(node.outputs, pricing),
    mintAmountUsd: mintAmountUsdFor(node, pricing),
  };
}
export function toTxListNode(
  tx: GQLTransaction,
  height: number,
  index: number,
  pricing: Pricing = { usd: null, baseAssetId: '' },
) {
  return {
    ...withGasCostsUsd(
      TransactionEntity.createFromGQL(tx, height, index).toGQLListNode(),
      pricing.usd,
    ),
    mintAmountUsd: mintAmountUsdFor(tx, pricing),
    cursor: txCursor(height, index),
  };
}

async function locateTx(
  ctx: AppContext,
  hash: string,
): Promise<{ block: GQLBlock; index: number } | null> {
  const local = ctx.index.heightForTx(hash);
  if (local) {
    const block = await ctx.store.get(local.height);
    if (block?.transactions[local.txIndex]?.id === hash)
      return { block, index: local.txIndex };
  }
  const height = await ctx.client.heightForTx(hash);
  if (height == null) return null;
  const block = await ctx.store.get(height);
  if (!block) return null;
  const index = block.transactions.findIndex((t) => t.id === hash);
  return index < 0 ? null : { block, index };
}

async function collectDown(
  ctx: AppContext,
  start: { height: number; txIndex: number },
  size: number,
  pricing: Pricing,
) {
  const out: ReturnType<typeof toTxListNode>[] = [];
  let h = start.height;
  let idx = start.txIndex;
  while (out.length < size && h >= 0) {
    const block = await ctx.store.get(h);
    if (!block) break;
    const from = idx == null ? block.transactions.length - 1 : idx;
    for (let i = from; i >= 0 && out.length < size; i--)
      out.push(toTxListNode(block.transactions[i], h, i, pricing));
    h -= 1;
    idx = null as unknown as number;
  }
  return out;
}

type FcItem = { id: string; height: number; cursor: string };
type FcDir =
  | { kind: 'older'; after?: string }
  | { kind: 'newer'; before?: string };

async function renderFcItem(ctx: AppContext, it: FcItem, pricing: Pricing) {
  const block = await ctx.store.get(it.height);
  const idx =
    block?.transactions.findIndex(
      (t) => t.id.toLowerCase() === it.id.toLowerCase(),
    ) ?? -1;
  if (!block || idx < 0) return null;
  return {
    ...toTxListNode(block.transactions[idx], it.height, idx, pricing),
    cursor: `fc:${it.cursor}`,
  };
}

// One raw fuel-core page (before rendering/dedup) is cached per exact
// (owner, direction, cursor, size) combination the caller can hit again --
// e.g. a client re-polling the same page. `size` is part of the key because
// a page fetched for a smaller page size may not carry enough items for a
// larger one requested later.
function fcRawPageCacheKey(owner: string, size: number, dir: FcDir): string {
  const cursor = dir.kind === 'older' ? (dir.after ?? '') : (dir.before ?? '');
  return `fcPage:${owner}:${dir.kind}:${size}:${cursor}`;
}

type FcRawPage = {
  items: FcItem[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

async function fetchFcRawPage(
  ctx: AppContext,
  owner: string,
  size: number,
  dir: FcDir,
): Promise<FcRawPage> {
  const cache = DataCache.getInstance();
  const cacheKey = fcRawPageCacheKey(owner, size, dir);
  const hit = cache.get(cacheKey) as FcRawPage | undefined;
  if (hit) return hit;
  const fc =
    dir.kind === 'older'
      ? await ctx.client.txsByOwner(owner, {
          first: size + 1,
          after: dir.after,
        })
      : await ctx.client.txsByOwner(owner, {
          last: size + 1,
          before: dir.before,
        });
  const hits = ctx.hot.hits('account', owner);
  const ttl = Math.min(
    FC_PAGE_TTL_CAP_MS,
    FC_PAGE_TTL_BASE_MS * Math.max(1, hits),
  );
  cache.save(cacheKey, ttl, fc);
  return fc;
}

// Fetches size+1 items from fuel-core in the given direction, renders and dedupes them
// against `existing` (already-rendered index rows), and consumes at most `size` NEW
// items. Per-item cursors (prefixed `fc:`) drive `connection()`'s own startCursor/
// endCursor derivation, so callers never touch pageInfo.endCursor directly.
async function pageFromFuelCore(
  ctx: AppContext,
  owner: string,
  size: number,
  dir: FcDir,
  existing: ReturnType<typeof toTxListNode>[] = [],
  pricing: Pricing = { usd: null, baseAssetId: '' },
) {
  const fc = await fetchFcRawPage(ctx, owner, size, dir);

  // Walk fc.items in batches: pick just enough not-yet-seen candidates to
  // fill what's still missing, render that batch concurrently (so the
  // common all-succeed case pays for one round trip, not `size` of them --
  // this is what turned an unpinned transactionsByOwner page into a 504),
  // then check whether the page is actually full. A batch member that fails
  // to render (renderFcItem returns null -- a transient S3/block lookup
  // miss) does not shrink the page or get retried; instead the next batch
  // draws additional candidates from the remaining fc.items to compensate,
  // the same way the original serial loop kept trying further items until
  // the page filled or fc.items ran out.
  const items = [...existing];
  const seen = new Set(items.map((i) => (i.id ?? '').toLowerCase()));
  let i = 0;
  while (items.length < size && i < fc.items.length) {
    const toRender: FcItem[] = [];
    let needed = size - items.length;
    while (needed > 0 && i < fc.items.length) {
      const it = fc.items[i];
      i += 1;
      if (seen.has(it.id.toLowerCase())) continue;
      seen.add(it.id.toLowerCase());
      toRender.push(it);
      needed -= 1;
    }
    const rendered = await Promise.all(
      toRender.map((it) => renderFcItem(ctx, it, pricing)),
    );
    for (const r of rendered) if (r) items.push(r);
  }
  const leftover = i < fc.items.length;
  return {
    items,
    hasNextPage: dir.kind === 'older' ? leftover || fc.hasNextPage : true,
    hasPreviousPage:
      dir.kind === 'newer' ? leftover || fc.hasPreviousPage : true,
  };
}

export const transactionResolvers = {
  Query: {
    async transaction(_: unknown, args: { id: string }, ctx: AppContext) {
      const id = args.id.toLowerCase();
      const found = await locateTx(ctx, id);
      if (!found) return null;
      ctx.hot.hit('tx', id);
      const pricing: Pricing = {
        usd: await ctx.price.usd(),
        baseAssetId: ctx.chain.baseAssetId,
      };
      return toTxNode(
        found.block.transactions[found.index],
        Number(found.block.height),
        found.index,
        pricing,
      );
    },

    async transactions(_: unknown, args: PageArgs, ctx: AppContext) {
      const size = pageSize(args);
      const tip = ctx.tip.servedTip;
      if (tip === 0) return emptyConnection();
      // Only the plain first page (no cursor) is cacheable: it's the one hit by
      // every client's poll, and unlike a cursor page its result doesn't depend
      // on anything but `size`. Key on size so different page sizes don't collide.
      const isFirstPage = !args.before && !args.after;
      const cache = DataCache.getInstance();
      const cacheKey = `transactions:first:${size}`;
      if (isFirstPage) {
        const hit = cache.get(cacheKey);
        if (hit) return hit;
      }
      const pricing: Pricing = {
        usd: await ctx.price.usd(),
        baseAssetId: ctx.chain.baseAssetId,
      };
      let start: { height: number; txIndex: number };
      if (args.before) {
        const c = parseTxCursor(args.before);
        start =
          c.txIndex > 0
            ? { height: c.height, txIndex: c.txIndex - 1 }
            : { height: c.height - 1, txIndex: null as unknown as number };
      } else if (args.after) {
        const c = parseTxCursor(args.after);
        const up = await collectUp(ctx, c, size + 1, tip, pricing);
        const hasNextPage = up.length > size;
        const items = up.slice(0, size).reverse();
        return connection(items, {
          hasNextPage,
          hasPreviousPage: true,
          ...txListCounts(ctx, items),
        });
      } else {
        start = { height: tip, txIndex: null as unknown as number };
      }
      const items = await collectDown(ctx, start, size, pricing);
      const last = items[items.length - 1];
      const result = connection(items, {
        hasNextPage: !!args.before,
        hasPreviousPage: last ? parseTxCursor(last.cursor).height > 0 : false,
        ...txListCounts(ctx, items),
      });
      if (isFirstPage) cache.save(cacheKey, FIRST_PAGE_CACHE_TTL_MS, result);
      return result;
    },

    async transactionsByBlockId(
      _: unknown,
      args: PageArgs & { blockId: string },
      ctx: AppContext,
    ) {
      const size = pageSize(args);
      const isHeight =
        !args.blockId.startsWith('0x') && !Number.isNaN(Number(args.blockId));
      const h = await resolveHeight(
        ctx,
        isHeight ? null : args.blockId,
        isHeight ? args.blockId : null,
      );
      if (h == null) return emptyConnection();
      const block = await ctx.store.get(h);
      if (!block) return emptyConnection();
      const pricing: Pricing = {
        usd: await ctx.price.usd(),
        baseAssetId: ctx.chain.baseAssetId,
      };
      const all = block.transactions
        .map((t, i) => toTxListNode(t, h, i, pricing))
        .reverse();
      let startAt = 0;
      if (args.before)
        startAt = all.findIndex((n) => n.cursor === args.before) + 1;
      if (args.after)
        startAt = Math.max(
          0,
          all.findIndex((n) => n.cursor === args.after) - size,
        );
      const page = all.slice(startAt, startAt + size);
      return connection(page, {
        hasNextPage: startAt > 0,
        hasPreviousPage: startAt + size < all.length,
        totalCount: all.length,
        startCount: startAt + 1,
        endCount: startAt + page.length,
      });
    },

    async transactionsByOwner(
      _: unknown,
      args: PageArgs & { owner: string; ownerType?: string | null },
      ctx: AppContext,
    ) {
      const size = pageSize(args);
      const owner = args.owner.toLowerCase();
      ctx.hot.hit('account', owner);
      const pricing: Pricing = {
        usd: await ctx.price.usd(),
        baseAssetId: ctx.chain.baseAssetId,
      };

      if (args.before?.startsWith('fc:')) {
        const page = await pageFromFuelCore(
          ctx,
          owner,
          size,
          { kind: 'older', after: args.before.slice(3) },
          [],
          pricing,
        );
        const total = page.hasNextPage
          ? TX_COUNT_CAP
          : ctx.index.countForAccount(owner, TX_COUNT_CAP);
        return connection(page.items, {
          hasNextPage: page.hasNextPage,
          hasPreviousPage: page.hasPreviousPage,
          totalCount: total,
          ...fuelCoreFallbackCounts(page.items.length),
        });
      }
      if (args.after?.startsWith('fc:')) {
        const page = await pageFromFuelCore(
          ctx,
          owner,
          size,
          { kind: 'newer', before: args.after.slice(3) },
          [],
          pricing,
        );
        const total = ctx.index.countForAccount(owner, TX_COUNT_CAP);
        return connection(page.items, {
          hasNextPage: page.hasNextPage,
          hasPreviousPage: page.hasPreviousPage,
          totalCount: total,
          ...fuelCoreFallbackCounts(page.items.length),
        });
      }

      const refs = ctx.index.txsForAccount(owner, {
        before: args.before ?? undefined,
        after: args.after ?? undefined,
        limit: size + 1,
      });
      const indexPage = refs.slice(0, size);
      const items: ReturnType<typeof toTxListNode>[] = [];
      for (const ref of indexPage) {
        const block = await ctx.store.get(ref.height);
        const tx = block?.transactions[ref.txIndex];
        if (tx) items.push(toTxListNode(tx, ref.height, ref.txIndex, pricing));
      }
      let total = ctx.index.countForAccount(owner, TX_COUNT_CAP);

      const oldest = refs[refs.length - 1];
      const range = ctx.index.range();
      const atOldBoundary =
        !!oldest && range.from != null && oldest.height === range.from;
      // The fuel-core fallback exists to reach further back than the 48h
      // index window goes, so it only makes sense once there's nowhere older
      // left to look (no rows at all, or the oldest row found is the index's
      // own oldest boundary) AND we're not already paginating toward newer
      // transactions via `after`. Firing it for a plain `after` cursor with
      // zero rows -- which just means "nothing newer than this yet" -- was
      // the reproduced cause of the transactionsByOwner 504: it re-fetched
      // fuel-core's own most-recent page for a high-volume account on every
      // such request instead of returning the (correct) empty page.
      const atBoundary = !args.after && (refs.length === 0 || atOldBoundary);
      if (indexPage.length < size && atBoundary) {
        const page = await pageFromFuelCore(
          ctx,
          owner,
          size,
          { kind: 'older', after: undefined },
          items,
          pricing,
        );
        if (page.hasNextPage) total = TX_COUNT_CAP;
        return connection(page.items, {
          hasNextPage: page.hasNextPage,
          hasPreviousPage: page.hasPreviousPage,
          totalCount: total,
          ...fuelCoreFallbackCounts(page.items.length),
        });
      }

      // items[0] is the newest row in the page and items[last] the oldest
      // (txsForAccount always returns newest-first); position is 1-based and
      // ascending from the account's oldest transaction, matching
      // production (e.g. a busy account's most recent page reporting
      // something like 992/1001, not 1/1001). Clamped to [1, total] so a cap
      // saturating both the total and the newer-than-ref count (an account
      // with more than TX_COUNT_CAP transactions still in the 48h
      // window) can't report a false zero on a non-empty page.
      const rankAscending = (ref: { height: number; txIndex: number }) =>
        Math.max(
          1,
          Math.min(
            total,
            total - ctx.index.newerCountForAccount(owner, ref, TX_COUNT_CAP),
          ),
        );
      const endCount = items.length ? rankAscending(indexPage[0]) : 0;
      const startCount = items.length
        ? rankAscending(indexPage[indexPage.length - 1])
        : 0;

      return connection(items, {
        hasNextPage: !!args.before || (!!args.after && refs.length > size),
        hasPreviousPage: args.after ? true : refs.length > size,
        totalCount: total,
        startCount,
        endCount,
      });
    },
  },
};

// Fuel-core fallback pages serve an account's history *older* than the 48h
// index window can see, so they must never reuse the index's own
// [total-pageLength+1, total] numbering -- that range is reserved for the
// most-recent, index-backed page, and reusing it here relabeled every page
// of ancient history "992-1001 of 1001" again. There's no reliable way to
// learn a fallback page's true distance from the account's very first
// transaction: fuel-core's own cursor is opaque (not a position we can
// decode), and nothing here tracks cumulative fallback depth across
// separate paginated requests. Rather than fabricate a number that *looks*
// precise but isn't, every fuel-core-served page is instead numbered
// independently, 1..pageLength from its own start -- always below and
// distinct from the index-backed range for the pages that matter in
// practice (an account has to be well past a single page's worth of history
// before fallback triggers at all), never 0 for a non-empty page, and
// honest about not claiming a precise absolute position. Known limitation:
// two *different* fuel-core-served pages both show 1..pageLength, so they
// aren't distinguishable from each other by this label alone -- only from
// the index-backed page they followed.
function fuelCoreFallbackCounts(pageLength: number) {
  if (pageLength === 0) return { startCount: 0, endCount: 0 };
  return { startCount: 1, endCount: pageLength };
}

// Global list position for the `transactions` (recentTransactions) root
// field: 1-based, ascending from the oldest transaction in the retention
// window (index.txCount()), the same convention as
// transactionsByOwner/rankAscending, and capped at the same TX_COUNT_CAP so
// the UI's "1000+" display convention (and the raw start/endCount numbers
// alongside it) stay in the same range instead of a real count running into
// the tens of thousands. `items` is newest-first (both collectDown and
// collectUp's after-branch return it that way), so items[0] is the page's
// endCount and the last item is its startCount. Clamped to [1, total] so a
// non-empty page never reports 0 (Pagination.tsx hides the count label on a
// falsy value).
function txListCounts(ctx: AppContext, items: { cursor: string }[]) {
  if (items.length === 0) return { startCount: 0, endCount: 0, totalCount: 0 };
  const total = ctx.index.txCount(TX_COUNT_CAP);
  const rankAscending = (cursor: string) => {
    const ref = parseTxCursor(cursor);
    return Math.max(
      1,
      Math.min(total, total - ctx.index.newerTxCount(ref, TX_COUNT_CAP)),
    );
  };
  return {
    totalCount: total,
    endCount: rankAscending(items[0].cursor),
    startCount: rankAscending(items[items.length - 1].cursor),
  };
}

async function collectUp(
  ctx: AppContext,
  c: { height: number; txIndex: number },
  limit: number,
  tip: number,
  pricing: Pricing,
) {
  const out: ReturnType<typeof toTxListNode>[] = [];
  let h = c.height;
  let idx = c.txIndex + 1;
  while (out.length < limit && h <= tip) {
    const block = await ctx.store.get(h);
    if (!block) break;
    for (let i = idx; i < block.transactions.length && out.length < limit; i++)
      out.push(toTxListNode(block.transactions[i], h, i, pricing));
    h += 1;
    idx = 0;
  }
  return out;
}
