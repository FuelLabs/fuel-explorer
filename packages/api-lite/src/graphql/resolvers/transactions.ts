import { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import type {
  GQLBlock,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';
import DataCache from '~/infra/cache/DataCache';
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

export function toTxNode(tx: GQLTransaction, height: number, index: number) {
  const node = TransactionEntity.createFromGQL(tx, height, index).toGQLNode();
  return { ...node, mintAmountUsd: node.mintAmountUsd ?? '' };
}
export function toTxListNode(
  tx: GQLTransaction,
  height: number,
  index: number,
) {
  return {
    ...TransactionEntity.createFromGQL(tx, height, index).toGQLListNode(),
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
) {
  const out: ReturnType<typeof toTxListNode>[] = [];
  let h = start.height;
  let idx = start.txIndex;
  while (out.length < size && h >= 0) {
    const block = await ctx.store.get(h);
    if (!block) break;
    const from = idx == null ? block.transactions.length - 1 : idx;
    for (let i = from; i >= 0 && out.length < size; i--)
      out.push(toTxListNode(block.transactions[i], h, i));
    h -= 1;
    idx = null as unknown as number;
  }
  return out;
}

type FcItem = { id: string; height: number; cursor: string };
type FcDir =
  | { kind: 'older'; after?: string }
  | { kind: 'newer'; before?: string };

async function renderFcItem(ctx: AppContext, it: FcItem) {
  const block = await ctx.store.get(it.height);
  const idx =
    block?.transactions.findIndex(
      (t) => t.id.toLowerCase() === it.id.toLowerCase(),
    ) ?? -1;
  if (!block || idx < 0) return null;
  return {
    ...toTxListNode(block.transactions[idx], it.height, idx),
    cursor: `fc:${it.cursor}`,
  };
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
) {
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

  const items = [...existing];
  const seen = new Set(items.map((i) => (i.id ?? '').toLowerCase()));
  let i = 0;
  while (items.length < size && i < fc.items.length) {
    const it = fc.items[i];
    i += 1;
    if (seen.has(it.id.toLowerCase())) continue;
    const rendered = await renderFcItem(ctx, it);
    if (rendered) {
      items.push(rendered);
      seen.add(it.id.toLowerCase());
    }
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
      const found = await locateTx(ctx, args.id.toLowerCase());
      if (!found) return null;
      return toTxNode(
        found.block.transactions[found.index],
        Number(found.block.height),
        found.index,
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
      let start: { height: number; txIndex: number };
      if (args.before) {
        const c = parseTxCursor(args.before);
        start =
          c.txIndex > 0
            ? { height: c.height, txIndex: c.txIndex - 1 }
            : { height: c.height - 1, txIndex: null as unknown as number };
      } else if (args.after) {
        const c = parseTxCursor(args.after);
        const up = await collectUp(ctx, c, size + 1, tip);
        const hasNextPage = up.length > size;
        const items = up.slice(0, size).reverse();
        return connection(items, { hasNextPage, hasPreviousPage: true });
      } else {
        start = { height: tip, txIndex: null as unknown as number };
      }
      const items = await collectDown(ctx, start, size);
      const last = items[items.length - 1];
      const result = connection(items, {
        hasNextPage: !!args.before,
        hasPreviousPage: last ? parseTxCursor(last.cursor).height > 0 : false,
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
      const all = block.transactions
        .map((t, i) => toTxListNode(t, h, i))
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

      if (args.before?.startsWith('fc:')) {
        const page = await pageFromFuelCore(ctx, owner, size, {
          kind: 'older',
          after: args.before.slice(3),
        });
        const total = page.hasNextPage
          ? 1001
          : ctx.index.countForAccount(owner, 1001);
        return connection(page.items, {
          hasNextPage: page.hasNextPage,
          hasPreviousPage: page.hasPreviousPage,
          totalCount: total,
        });
      }
      if (args.after?.startsWith('fc:')) {
        const page = await pageFromFuelCore(ctx, owner, size, {
          kind: 'newer',
          before: args.after.slice(3),
        });
        const total = ctx.index.countForAccount(owner, 1001);
        return connection(page.items, {
          hasNextPage: page.hasNextPage,
          hasPreviousPage: page.hasPreviousPage,
          totalCount: total,
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
        if (tx) items.push(toTxListNode(tx, ref.height, ref.txIndex));
      }
      let total = ctx.index.countForAccount(owner, 1001);

      const oldest = refs[refs.length - 1];
      const range = ctx.index.range();
      const atBoundary =
        refs.length === 0 ||
        (!!oldest && range.from != null && oldest.height === range.from);
      if (indexPage.length < size && atBoundary) {
        const page = await pageFromFuelCore(
          ctx,
          owner,
          size,
          { kind: 'older', after: undefined },
          items,
        );
        if (page.hasNextPage) total = 1001;
        return connection(page.items, {
          hasNextPage: page.hasNextPage,
          hasPreviousPage: page.hasPreviousPage,
          totalCount: total,
        });
      }

      return connection(items, {
        hasNextPage: !!args.before || (!!args.after && refs.length > size),
        hasPreviousPage: args.after ? true : refs.length > size,
        totalCount: total,
      });
    },
  },
};

async function collectUp(
  ctx: AppContext,
  c: { height: number; txIndex: number },
  limit: number,
  tip: number,
) {
  const out: ReturnType<typeof toTxListNode>[] = [];
  let h = c.height;
  let idx = c.txIndex + 1;
  while (out.length < limit && h <= tip) {
    const block = await ctx.store.get(h);
    if (!block) break;
    for (let i = idx; i < block.transactions.length && out.length < limit; i++)
      out.push(toTxListNode(block.transactions[i], h, i));
    h += 1;
    idx = 0;
  }
  return out;
}
