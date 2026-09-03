import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import Block from '~/infra/dao/Block';
import type { AppContext } from '../context';
import {
  type PageArgs,
  connection,
  emptyConnection,
  pageSize,
} from '../pagination';

export function toBlockNode(block: GQLBlock) {
  return new Block({ data: block }).toGQLNode();
}

type PoAConsensus = { __typename: 'PoAConsensus'; signature: string | null };

function needsSignature(block: GQLBlock): boolean {
  const consensus = block.consensus as
    | PoAConsensus
    | { __typename: string }
    | null;
  return (
    consensus?.__typename === 'PoAConsensus' &&
    (consensus as PoAConsensus).signature == null
  );
}

let lastSignatureFailureLogAt = 0;
function logSignatureFailure(count: number): void {
  const now = Date.now();
  if (now - lastSignatureFailureLogAt < 60_000) return;
  lastSignatureFailureLogAt = now;
  console.error(
    `blocks: fuel-core returned no signature for ${count} block(s); producer will be null`,
  );
}

/**
 * Fills in `consensus.signature` (fetched from fuel-core, since the S3 archive
 * carries no PoA signature) for any block still missing it, and persists the
 * patch to the store. Blocks fuel-core can't supply a signature for are left
 * with a null signature; the caller renders those as '0x' post toBlockNode so
 * Block's producer derivation (which requires a real signature) is skipped.
 */
export async function withSignatures(
  ctx: AppContext,
  blocks: GQLBlock[],
): Promise<GQLBlock[]> {
  const pending = blocks.filter(needsSignature);
  if (pending.length === 0) return blocks;
  const heights = pending.map((b) => Number(b.height));
  const sigs = await ctx.client.blockSignatures(heights);
  let missing = 0;
  for (const b of pending) {
    const h = Number(b.height);
    const sig = sigs.get(h);
    if (sig) {
      (b.consensus as PoAConsensus).signature = sig;
      ctx.store.patchConsensus(h, sig);
    } else {
      missing += 1;
    }
  }
  if (missing > 0) logSignatureFailure(missing);
  return blocks;
}

// `toBlockNode` shallow-spreads the stored block, so `node.consensus` is the
// SAME object cached in BlockStore's memory. Never mutate it here: doing so
// would permanently poison the cache with '0x' and stop retries against
// fuel-core. Instead return a fresh node with a replaced consensus object.
function toRenderedBlockNode(block: GQLBlock) {
  const node = toBlockNode(block);
  const consensus = node.consensus as
    | PoAConsensus
    | { __typename: string }
    | null;
  if (
    consensus?.__typename === 'PoAConsensus' &&
    (consensus as PoAConsensus).signature == null
  ) {
    return { ...node, consensus: { ...consensus, signature: '0x' } };
  }
  return node;
}

export async function resolveHeight(
  ctx: AppContext,
  id?: string | null,
  height?: string | null,
): Promise<number | null> {
  if (height != null) return Number(height);
  if (!id) return null;
  const local = ctx.index.heightForBlock(id);
  if (local != null) return local;
  return ctx.client.heightForBlock(id);
}

export const blockResolvers = {
  Query: {
    async block(
      _: unknown,
      args: { id?: string | null; height?: string | null },
      ctx: AppContext,
    ) {
      if (!args.id && args.height == null)
        throw new Error('Either id or height must be provided');
      const h = await resolveHeight(ctx, args.id, args.height);
      if (h == null) return null;
      const block = await ctx.store.get(h);
      if (!block) return null;
      ctx.hot.hit('block', String(h));
      await withSignatures(ctx, [block]);
      return toRenderedBlockNode(block);
    },

    async blocks(_: unknown, args: PageArgs, ctx: AppContext) {
      const size = pageSize(args);
      const tip = ctx.tip.servedTip;
      if (tip === 0) return emptyConnection();
      let lo: number;
      let hi: number;
      // Clamp arbitrary `after`/`before` heights to [0, tip] so a caller can't force
      // uncached upstream misses by passing a height far beyond what's ever been served.
      if (args.after) {
        lo = Math.max(0, Math.min(tip, Number(args.after))) + 1;
        if (lo > tip) return emptyConnection();
        hi = Math.min(tip, lo + size - 1);
      } else {
        hi = args.before
          ? Math.max(0, Math.min(tip, Number(args.before))) - 1
          : tip;
        if (hi < 0) return emptyConnection();
        lo = Math.max(0, hi - size + 1);
      }
      const blocks = (await ctx.store.getRange(lo, hi))
        .filter((b): b is GQLBlock => b != null)
        .reverse();
      await withSignatures(ctx, blocks);
      const items = blocks.map((b) => ({
        ...toRenderedBlockNode(b),
        cursor: String(b.height),
      }));
      return connection(items, {
        hasNextPage: hi < tip,
        hasPreviousPage: lo > 0,
      });
    },
  },
};
