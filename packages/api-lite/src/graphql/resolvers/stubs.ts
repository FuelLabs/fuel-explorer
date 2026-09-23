import { txCursor } from '../../index/Index';
import {
  type PageArgs,
  connection,
  emptyConnection,
  pageSize,
} from '../pagination';
import {
  type VerifiedAsset,
  findExactMatch,
  isImpersonating,
  loadVerifiedAssets,
  resolveAsset,
} from './assetEnrich';

const empty = async () => emptyConnection();
const nil = async () => null;

// assets per contract are tiny (one row per SRC20 mint event), so the whole
// list is pulled into memory and paginated the same way transactionsByBlockId
// paginates a block's transaction list, instead of a second SQL query per page.
const ASSETS_BY_CONTRACT_CAP = 1000;

function assetNode(
  row: { assetId: string; subId: string },
  contractId: string,
  chainId: number,
  verified: VerifiedAsset[],
) {
  const match = findExactMatch(verified, chainId, row.assetId);
  return {
    __typename: 'Asset',
    assetId: row.assetId,
    contractId,
    subId: row.subId,
    name: match?.asset.name ?? null,
    symbol: match?.asset.symbol ?? null,
    icon: match?.asset.icon ?? null,
    decimals: match?.network.decimals ?? null,
    verified: !!match,
    suspicious: match ? false : isImpersonating(verified, row.subId),
  };
}

export const stubResolvers = {
  Query: {
    contracts: async (_: unknown, args: PageArgs, ctx: any) => {
      const rows = ctx.index.contracts({ limit: pageSize(args) });
      return {
        nodes: rows.map((r: any) => ({ _id: r.height, id: r.contractId })),
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
          endCursor: '',
        },
      };
    },
    predicate: async (_: unknown, args: { address: string }, ctx: any) => {
      const bytecode = ctx.index.predicate(args.address.toLowerCase());
      return bytecode ? { address: args.address, bytecode } : null;
    },
    asset: async (_: unknown, args: { assetId: string }, ctx: any) => {
      const verified = await loadVerifiedAssets();
      return resolveAsset(args.assetId, ctx, verified);
    },
    assetsByContract: async (
      _: unknown,
      args: { contractId: string } & PageArgs,
      ctx: any,
    ) => {
      const size = pageSize(args);
      const contractId = args.contractId.toLowerCase();
      const totalCount = ctx.index.countByContract(contractId);
      if (totalCount === 0) return emptyConnection();
      const all = (
        ctx.index.assetsByContract(contractId, ASSETS_BY_CONTRACT_CAP) as {
          assetId: string;
          subId: string;
          height: number;
        }[]
      ).map((r, i) => ({ ...r, cursor: txCursor(r.height, i) }));
      let startAt = 0;
      if (args.before)
        startAt = all.findIndex((n) => n.cursor === args.before) + 1;
      if (args.after)
        startAt = Math.max(
          0,
          all.findIndex((n) => n.cursor === args.after) - size,
        );
      const page = all.slice(startAt, startAt + size);
      const verified = await loadVerifiedAssets();
      const items = page.map((row) => ({
        ...assetNode(row, args.contractId, ctx.chain.chainId, verified),
        cursor: row.cursor,
      }));
      return connection(items, {
        hasNextPage: startAt > 0,
        hasPreviousPage: startAt + size < all.length,
        totalCount,
        startCount: startAt + 1,
        endCount: startAt + items.length,
      });
    },
    balanceByBlockHeight: nil,
    searchFast: nil,
    searchSlow: nil,
    stakingAPY: nil,
    stakingEvents: empty,
    stakingEvent: nil,
    bridgeEvents: empty,
    bridgeEvent: nil,
  },
};
